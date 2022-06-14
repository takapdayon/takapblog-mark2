---
title: dockerでminecraftサーバ爆速構築
date: '2020-03-03T23:46:37.121Z'
description: dockerでminecraftサーバを爆速で構築します。一つできれば、あとはコピーで複数のサーバを同時構築可能です。
tags: ['minecraft', 'docker']
image: no-image.png
---

# はじめに

過去 Qiita に似たような記事記載しております。
[docker でマイクラのポケモンサーバ簡単構築](https://qiita.com/takapp/items/95780a5ef74f25f25436)

今回は、pixelmon ではなく単純に MOD なし Minecraft サーバを構築していきたいと思います。

# 概要

docker-compose のポートを変えるだけで簡単に minecraft のサーバを立ち上げれる。

※後日バックアップで使用してるシェル等も記載したいと思います。

## 準備

docker-hub に先人の神様が作り上げてくれた image があるためこちらを利用します。
そのため、用意するものは docker-compose のみです。
[itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server)

### ディレクトリ構造

> root
> |--docker-compose.yml
> |--25565
> |　　|--data
> |　　|--mods

data は空ディレクトリで OK
mods は入れたい mods があればここに入れてください。

### docker-compose.yml

```yml
version: '3'
services:
  minecraft-server:
    container_name: minecraft
    image: itzg/minecraft-server
    ports:
      - '25565:25565'
    tty: true
    stdin_open: true
    restart: always
    volumes:
      - ./25565/mods:/data/mods/
      - ./25565/data:/data/
    environment:
      EULA: 'TRUE'
      VERSION: '任意のversion'
```

enviroment の中身に関しては、image のページで説明ありますので省略します。

forge 等を利用したい場合、enviroment に設定が必要なので
僕の pixelmon の qiita を真似ていただければと思います。

volume でコンテナ内に同期させ、/data でデータを永続化してます。そのため、ホスト側でシェル等を自動起動しバックアップを取ることも可能です(僕はそうしてます。)

### 実行

```shell
$docker-compose up -d
```

と実行すれば完了です。
複数構築したい場合は、同じディレクトリを作成し、ホスト側のポートを変更し実行すれば OK です(接続するときはアドレス:ポート番号が必要です)
