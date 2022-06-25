---
title: アプリの特定処理のアウトバウンド通信のみローカルProxyを通す
date: 2022-06-19
description: Squidを用いて、Webアプリの特定のアウトバウンドのみProxyを通すようにした備忘録
tags: ['squid', 'linux', 'docker']
image: squid-icon.png
---

## 初めに
今回dockerを用いて環境を用意したのですが、結論最後の確認でエラーとなり、想定していた動作にはなりませんでした...(数時間原因特定したのですがわけわかめでした)

ただ、実サーバを用いた場合はこの設定で問題なかった為、一旦備忘録として残しておこうと思います

## 概要

とあるお仕事で古い環境でTLSの1.2↑の対応をしなければならなくなりました。まぁ通常であれば、しっかりと動作検証してTLSの対応バージョンまでOS, その他必要なバージョンを引き上げる作業をするのが妥当かと思いますが、その場合検証等でかなり時間がかかります。今回はあまり時間もなかった関係から対象通信のみをローカルにインストールしたProxyサーバを経由することで解決しました。その際の記録です

## 環境

* windows10
* Docker version 20.10.11, build dea9396
* docker-compose version 1.29.2, build 5becea4c

## 仕様

今回対応するにあたって、proxyを通すことによる影響度調査をOSレベルで行いたくなかったため、**アプリでの通信のみ**proxyを通るようにしました。
EC2でautoscallingによって冗長化していたため、proxyを別途立てて、そのproxyを通すこともしたくありませんでした(proxyが単一障害点になるため)
そのため、ローカル内にsquidを用いて、proxyを立てる方針で対応しました

## 前準備

上記検証の環境をdockerにて準備しました。
内容としては、nginxコンテナへのアクセスにhttpsを使えるようにすることと、nginxでtlsバージョンが低いものは弾くようにしました。
また、証明局まで用意して対応するのは少し面倒なので、自己証明書のみにし通信時に証明書の検証を行わないようにします

### 1.ディレクトリ構成
ディレクトリ構成は以下のような感じです。今回特にリクエストに拘る必要はないので、nginxから直接jsonを返すように設定したいと思います
```awk
│  docker-compose.yml
│  README.md
│
├─webapp
│  │  Dockerfile
│  │
│  └─app
│      requirements.txt
│      main.py
└─nginx
    │  default.conf
    │
    └─html
        │  index.json
        │
        └─tls
            server.crt
            server.der
            server.key
```

各ファイルを以下のように設定しておこうと思います

```json:title=index.json
{
  "test": "proxy-test"
}
```

```nginx:title=default.conf
server {
    listen       80;
    server_name nginx.takap.dev;

    charset UTF-8;
    charset_types text/css application/json text/plain;

    location /index.json {
        default_type "application/json";
        root /usr/share/nginx/html;
        break;
    }

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

```docker:title=Dockerfile
FROM python:3.9-buster

RUN apt-get update -y

COPY ./webapp/app /app
RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 9001
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "9001"]
```

```python:title=requirements.txt
anyio==3.6.1
asgiref==3.5.2
certifi==2022.6.15
charset-normalizer==2.0.12
click==8.1.3
fastapi==0.78.0
h11==0.13.0
idna==3.3
pydantic==1.9.1
requests==2.28.0
sniffio==1.2.0
starlette==0.19.1
typing_extensions==4.2.0
urllib3==1.26.9
uvicorn==0.17.6
```

```python:title=main.py
import ssl
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.poolmanager import PoolManager
from fastapi import FastAPI

app = FastAPI()

class MyAdapter(HTTPAdapter):
    def init_poolmanager(self, connections, maxsize, block=False):
        self.poolmanager = PoolManager(
            num_pools=connections,
            maxsize=maxsize,
            block=block,
            ssl_version=ssl.PROTOCOL_TLSv1
        )

@app.get("/")
async def root():
    url = "https://nginx.takap.dev/index.json"
    session = requests.Session()
    session.mount('https://', MyAdapter())
    try:
        res = session.get(url, verify=False)
    except Exception:
        return {"message": "error"}
    return res.json()
```

default.confの設定で、httpのリクエストの際に/index.jsonでアクセスが来たら/usr/share/nginx/html配下にあるindex.jsonを返すようになりました。

### 2.docker-compose
クライアントからのリクエストを受け取るコンテナ(webapp)と、そのコンテナから通信を受けるコンテナ(nginx)を立てるようにします。必要なデータはvolumeで渡します
```yaml
version: "3"
services:
  nginx:
    image: nginx:latest
    container_name: nginx.takap.dev
    ports:
      - "9000:80"
      - "9443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/html:/usr/share/nginx/html
  webapp:
    build:
      context: ./
      dockerfile: ./webapp/Dockerfile
    container_name: webapp
    ports:
      - "9001:9001"
    volumes:
      - ./webapp/app/:/app
    tty: true
```

一旦この状態でコンテナを立ち上げていただき、webappコンテナからnginx側にリクエストできるか確認します
```bash
$ docker-compose up -d
$ docker-compose exec webapp /bin/bash
root@b6566e5e8630:/\# curl http://nginx.takap.dev/index.json
{
  "test": "proxy-test"
}
root@b6566e5e8630:/#
```

OKですね。後はhttpsプロトコルで通信が行えるようにし、かつTLSのバージョンを絞る設定をすれば前準備は完了っぽいですね

### 3.自己証明書設定
nginxコンテナ内で自己証明書を作成して、nginxで使用できるようにします

```bash
$ docker-compose exec nginx /bin/bash

# 自己証明書作成
$ openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt
$ openssl x509 -in server.crt -outform PEM -out server.pem
$ ls
# できた3つのファイルをディレクトリ移動する
$ mkdir /usr/share/nginx/html/tls
$ mv server.crt server.pem server.key /usr/share/nginx/html/tls/.
```

nginxの設定で、httpsを受け付けるようにし、TLS1.2以上を対象に限定します

```nginx
server {
    listen 443 ssl;
    server_name nginx.takap.dev;

    ssl_certificate /usr/share/nginx/html/tls/server.crt;
    ssl_certificate_key /usr/share/nginx/html/tls/server.key;
    ssl_protocols　TLSv1.2 TLSv1.3;

    charset UTF-8;
    charset_types text/css application/json text/plain;

    location /index.json {
        default_type "application/json";
        root /usr/share/nginx/html;
        break;
    }

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

これで、httpsでの通信+tls1.2以上の設定が完了したので一旦確認したいと思います。ローカルもしくはwebappコンテナからcurlで確認します。検証ではwebapp側からリクエストするので今回はwebappコンテナ内から確認します

```bash
# 証明書の検証をしないように-kオプションをつける
root@afad9a62c43a:/\# curl https://nginx.takap.dev/index.json -k
{
  "test": "proxy-test"
}
root@afad9a62c43a:/#

# tls1.1以下の場合は通信が弾かれる
root@afad9a62c43a:/\# curl https://nginx.takap.dev/index.json -k -3
curl: (4) OpenSSL was built without SSLv3 support
root@afad9a62c43a:/#
```

いい感じですね。これでwebappコンテナ側からのhttps通信はnginxコンテナにリクエストでき、かつTLSのバージョンが低い(今回だとSSL3)と通信が行えない環境が出来上がりました

## squid導入
(前準備だけで記事分割しても良いほどに結構長くなってしまった)...記事を参照する際にあまり本筋と関係のないことばかりだと探すのが面倒なのでとか考えようかなって今思いながら書いてますがまぁ個人ブログだからいいかって感じでじゃあ導入していきましょう

### 1.squidインストール
squidとsquid-helpersをインストールします。
注意点がhttpsの通信をproxyする際に、ssl bumpの設定がonになってない場合、httpsの接続がきたらsquidは宛先にconnectionを張り、httpsのリクエストを丸投げします(中身に干渉しない...できない)
SSL bumpを使うことで、一旦sslを解くため中身に干渉できるようになります。

そのため今回はssl bumpの設定をするのですが、squidをbuildする際にssl bumpを使えるようにオプションを付与してあげないといけません。脳死インストールするとオプションがない場合もあります。
```bash
$ squid -v
# この中に--enable-ssl-crtdと--with-opensslの項目がない場合は使えない
```

その場合はwgetでとってきて自分でbuildするなりの形となります。

ただ今回は元々対応したosがcentosなこともあり、新たにcentosのコンテナを立ち上げてそっちに入れていこうと思います(決して、ビルドとか諸々試してエラーになって最後の手段でcentosに苦しまぎれに要れるわけではないです)

以下のように諸々を変更し、再度docker-composeをupします

```awk
│  docker-compose.yml
│  README.md
│
├─proxy
│      Dockerfile
│
├─webapp
│  │  Dockerfile
│  │
│  └─app
│      requirements.txt
│      main.py
└─nginx
    │  default.conf
    │
    └─html
        │  index.json
        │
        └─tls
            server.crt
            server.der
            server.key
```

```yaml
  # 追加
  proxy:
    build:
      context: ./
      dockerfile: ./proxy/Dockerfile
    container_name: local_proxy
    ports:
      - "3128:3128"
    privileged: true
    command: /sbin/init
    tty: true
```

```docker:title=/proxy/Dockerfile
FROM centos:7

RUN yum install -y bzip2 bzip2-devel gcc gcc-c++ make openssl-devel readline-devel zlib-devel wget curl unzip vim epel-release git \
    && yum install -y tig jq vim-enhanced bash-completion net-tools bind-utils \
    && rm -rf /var/cache/yum/*

RUN yum update -y

RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LC_CTYPE "ja_JP.UTF-8"
ENV LC_NUMERIC "ja_JP.UTF-8"
ENV LC_TIME "ja_JP.UTF-8"
ENV LC_COLLATE "ja_JP.UTF-8"
ENV LC_MONETARY "ja_JP.UTF-8"
ENV LC_MESSAGES "ja_JP.UTF-8"
ENV LC_PAPER "ja_JP.UTF-8"
ENV LC_NAME "ja_JP.UTF-8"
ENV LC_ADDRESS "ja_JP.UTF-8"
ENV LC_TELEPHONE "ja_JP.UTF-8"
ENV LC_MEASUREMENT "ja_JP.UTF-8"
ENV LC_IDENTIFICATION "ja_JP.UTF-8"
ENV LC_ALL ja_JP.UTF-8

EXPOSE 3128
CMD ["/bin/sh"]
```

また、buildするのはもうこりごりなので、wikiにあるパッケージをinstallする(こっちはssl bump設定が有効になっている)方向にします
> https://wiki.squid-cache.org/KnowledgeBase/CentOS

```bash:title=/etc/yum.repos.d/squid.repo
[squid]
name=Squid repo for CentOS Linux - $basearch
#IL mirror
baseurl=http://www1.ngtech.co.il/repo/centos/$releasever/$basearch/
failovermethod=priority
enabled=0
gpgcheck=0
```

ではインストールします
```bash
$ yum install squid squid-helpers --enablerepo=squid

# --enable-ssl-crtdと--with-opensslがあるか確認
$ squid -v | grep ssl
# 省略
'--with-openssl' '--enable-ssl-crtd'
```

### 2.ssl bump設定
やることとしては以下2点です
* 自己証明書の作成
* nginxの証明書のインポート
* ssl bumpの設定

まずは自己証明書を作成していきます。

```bash
$ cd /etc/squid
$ mkdir ssl_cert
$ chown squid:squid ssl_cert
$ chmod 700 ssl_cert
$ cd ssl_cert
$ openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout squidCA.key -out squidCA.crt
$ openssl dhparam -outform PEM -out /etc/squid/ssl_cert/squidCA_dhparam.pem 2048
$ chown squid:squid /etc/squid/ssl_cert/squid*
$ chmod 400 /etc/squid/ssl_cert/squid*

$ mkdir -p /var/lib/squid
$ rm -rf /var/lib/squid/ssl_db
$ /usr/lib64/squid/security_file_certgen -c -s /var/lib/squid/ssl_db -M 4MB
$ chown -R squid:squid /var/lib/squid
```

次に証明書のインポートをしていきます。先ほどnginx側で作成したpemキーを以下に配置しcaをupdateします
```bash
$ cp server.pem /usr/share/pki/ca-trust-source/anchors/server.pem
$ update-ca-trust
```

これでproxy側からnginxに対してのhttpsアクセスは証明書を検証してくれるようになったはずです

次にsquidのconf設定をしていきます

```conf:title=/etc/squid/squid.conf
# 以下を追記、http_portのみコメントアウトする
visible_hostname local_proxy

# http_port 3128
# ssl3等受け付けるようにするためにoptionsはALLに設定
http_port 3128 tcpkeepalive=60,30,3 ssl-bump generate-host-certificates=on dynamic_cert_mem_cache_size=20MB cert=/etc/squid/ssl_cert/squidCA.crt key=/etc/squid/ssl_cert/squidCA.key cipher=ALL options=ALL tls-dh=prime256v1:/etc/squid/ssl_cert/squidCA_dhparam.pem

logformat timefm %{%Y/%m/%d %H:%M:%S}tl %ts.%03tu %6tr %>a %Ss/%03>Hs %<st %rm %ru %[un %Sh/%<a %mt
access_log daemon:/var/log/squid/access.log timefm

sslcrtd_program /usr/lib64/squid/security_file_certgen -s /var/lib/squid/ssl_db -M 20MB
sslproxy_cert_error allow all
acl step1 at_step SslBump1
ssl_bump peek step1
ssl_bump bump all

# headerを付与しない
request_header_access X-forwarded-For deny all
request_header_access Via deny all
request_header_access Cache-Control deny all
request_header_access Surrogate-Capability deny all
request_header_access Connection deny all
# cache無効化
acl NOCACHE src all
cache deny NOCACHE
```

最後にsquidの再起動をします
```bash
$ systemctl restart squid
```

これで準備は完了です

## 確認
確認は冒頭に書いたようにエラーで終わりました...ただエラーも備忘録として記載していこうと思います

```bash
# webappコンテナ内
$ export https_proxy=https://local_proxy:3128
$ curl https://nginx.takap.dev/index.json -3 -k
curl: (35) error:1408F10B:SSL routines:ssl3_get_record:wrong version number

# httpであればproxy経由でも問題ない
$ http_proxy=http://local_proxy:3128 curl http://nginx.takap.dev/index.json
{
  "test": "proxy-test"
}

# httpsをconnectで丸投げする場合、proxyのlogは正常にconnectできる
$ https_proxy=http://local_proxy:3128 curl https://nginx.takap.dev/index.json
curl: (60) SSL certificate problem: self signed certificate in certificate chain

# log
2022/06/25 09:29:32 1656149372.152     10 172.24.0.4 NONE_NONE/200 0 CONNECT nginx.takap.dev:443 - HIER_DIRECT/172.24.0.3 -

$ curl https://example.com
curl: (35) error:1408F10B:SSL routines:ssl3_get_record:wrong version number
```

気力がなくなったので直近調査はしませんが、暇になったら調べてみようと思います。何かわかる方いらっしゃいましたらtwitterなりで連絡いただけると大変助かります!

またタイトル通りアプリ側からのみアウトバウンドをproxy経由も一応残しておきます
```python:title=main.py
import ssl
import os
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.poolmanager import PoolManager
from fastapi import FastAPI

app = FastAPI()

class MyAdapter(HTTPAdapter):
    def init_poolmanager(self, connections, maxsize, block=False):
        self.poolmanager = PoolManager(
            num_pools=connections,
            maxsize=maxsize,
            block=block,
            ssl_version=ssl.PROTOCOL_TLSv1
        )

@app.get("/")
async def root():
    os.environ['HTTPS_PROXY'] = 'https://local_proxy:3128'
    url = "https://nginx.takap.dev/index.json"
    session = requests.Session()
    session.mount('https://', MyAdapter())
    try:
        res = session.get(url, verify=False)
    except Exception:
        return {"message": "error"}
    return res.json()
```

requestsの場合、HTTP_PROXY, HTTPS_PROXYが環境変数にある場合はそのproxyを使ってくれます。これでこの処理の時のみproxyを通るようになります。

## 参考
pythonでのssl設定等はこちらを参考にしました
> https://docs.python.org/ja/3/library/ssl.html#ssl.SSLContext
> https://stackoverflow.com/questions/54938923/requests-ignoring-setting-op-no-sslv3

squid ssl bump設定
> https://support.kaspersky.com/KWTS/6.1/ja-JP/166244.htm
> https://wiki.squid-cache.org/ConfigExamples/Intercept/SslBumpExplicit
> https://serverfault.com/questions/680737/missing-ssl-crtd-folder-with-squid-3-5-2-centos
