---
title: dockerでdiscord bot開発環境構築
date: '2020-03-03T12:46:37.121Z'
description: dockerでdiscord botの開発環境を構築するための記事です。開発言語はpythonを前提に進めます。
tags: ['discord', 'python', 'docker']
image: discord-icon.png
---

## はじめに

qiita からの転載となります。
[docker で discord bot 開発環境構築](https://qiita.com/takapp/items/abcf1f56285ba601b701)

ブログ記事かくのに慣れるため、qiita で書いた記事を
リメイクし再度こちらに投稿いたしました。

## 概要

python と code-server のコンテナを docker-compose を使い
開発環境を瞬時に作り上げます。

## 内容

### 準備

#### docker file

```Dockerfile
FROM python:3
USER root

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

RUN apt-get install -y vim less
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN python -m pip install numpy
RUN python -m pip install discord.py
```

#### docker-compose.yml

```yml
version: '3'
services:
  python:
    restart: always
    build: .
    container_name: 'python3'
    working_dir: '/root/'
    tty: true
    volumes:
      - ./app:/root/opt
  code:
    image: codercom/code-server:latest
    restart: always
    user: '0:0'
    ports:
      - '8080:8080'
    command: ./code-server --auth none
    volumes:
      - ./app:/root/app
```

qiita 記事側の code-server 設定だと、編集等できない可能性
がありますので、こちら参照していただき作成してください

### 実行

#### compose up する

```sh
$docker-compose up -d
```

pw は無効で設定してありますので
http://localhost:8080
にアクセスしていただければ code-server に繋が流と思います

### discord bot 作成

python 側のボリュームでつなげたディレクトリ内に以下作成してください

```python
import discord

TOKEN = "自分のトークンID"
client = discord.Client()

@client.event
async def on_ready():
    print('ログイン')

@client.event
async def on_message(message):
    if message.author.bot:
        return
    if message.content == 'docker/python':
        await message.channel.send('docker/pythonテスト完了!')

client.run(TOKEN)
```

### python コンテナ内で実行

python コンテナに入り、上記で作成した discordbot を実行してみてください

```shell
$docker-compose exec python /bin/bash
```

```shell
$python ファイル名.py
```

実際 discord にて bot 導入し返答があれば成功です。
