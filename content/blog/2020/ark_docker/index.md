---
title: dockerでarkサーバ爆速構築
date: "2020-03-08"
description: dockerでarkサーバを爆速で構築します。基本的にminecraftと同じです。
tags: ["ark","docker"]
image: ark.png
---

# はじめに

前回のminecraftでの爆速構築と、やることは同じです。
[minecraftサーバ爆速構築](https://takap.net/minecraft_docker/)


# 概要
docker-composeのポートを変えるだけで簡単にarkのサーバを立ち上げれる。
また、環境変数を変えれば、マップ等の変更にも対応できます。

※後日バックアップで使用してるシェル等も記載したいと思います。



## 準備
前回のminecraft同様、またまた先人の神様が作り上げてくれたdocker imageを使います。
そのため、用意するものはdocker-composeのみです。
[turzam/ark](https://hub.docker.com/r/turzam/ark)


しょぼいサーバ等で立てる場合、6GBに届かない際は
スワップメモリを設定してくださいね！
(今回この設定自分は行っていないため省きます。)

### ディレクトリ構造
>root
>|--docker-compose.yml
>|--ark

arkは空ディレクトリでOK


#### docker-compose.yml
```yml
version: '3'
services:
    ark-server:
        container_name: ark7777
        image: turzam/ark
        ports:
            - "7778:7778"
            - "7778:7778/udp"
            - "7777:7777"
            - "7777:7777/udp"
            - "27015:27015"
            - "27015:27015/udp"
        tty: true
        stdin_open: true
        restart: always
        volumes:
            - ./ark:/ark
        environment:
            SESSIONNAME: "サーバ名"
            SERVERMAP: "マップ名"
            SERVERPASSWORD: "パスワード"
            ADMINPASSWORD: "管理者パスワード"
            TZ: "asia/tokyo"
```
enviromentの中身に関しては、先人の神様の詳細見ていただければと思います。
(バックアップ等の設定もできるため、一読をおすすめします。)



また、環境変数のみenvに書き出したい場合は下記のようにすれば多分可能です。

#### docker-compose.yml
```yml
version: '3'
services:
    ark-server:
        container_name: ark7777
        image: turzam/ark
        ports:
            - "7778:7778"
            - "7778:7778/udp"
            - "7777:7777"
            - "7777:7777/udp"
            - "27015:27015"
            - "27015:27015/udp"
        tty: true
        stdin_open: true
        restart: always
        volumes:
            - ./ark:/ark
        env_file:
            - ./.ark.env
        command:
            - 'env'
```
#### .ark.env
```
SESSIONNAME="サーバ名"
SERVERMAP="マップ名"
SERVERPASSWORD="パスワード"
ADMINPASSWORD="管理者パスワード"
TZ="asia/tokyo"
```

こうすれば、環境変数等気にせずにcomposeのコピーが行えるので
複数立ち上げたい方にはおすすめです。



### 実行
```shell
$docker-compose up -d
```

と実行すれば完了です。
立ち上げたばかりだと、arkディレクトリ内のGame.ini等シンボリックリンク先がない状態になっていますが
実行してから数分待たないといけませんので、焦らず待ってください。



## ark内の環境変更

下記コマンドで、waiting...になっていることを確認し
```shell
$docker-compose logs
```

一度docker-composeを落とします
```shell
$docker-compose down
```

そのあと、arkディレクトリ内に入り、中にある
Game.iniとGameUserSettings.iniを変更し再度立ち上げれば完了です。






ps:構築中、Game.iniがシンボリックリンク先がないところで焦って
1時間無駄にしました・・・
皆さんも構築するときは"焦らずに"
