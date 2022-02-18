---
title: vueでデプロイ先がサブディレクトリの場合
date: "2020-08-31T12:46:37.121Z"
description: デプロイ先がサブディレクトリの場合の変更点です
tags: ["vue", "cors", "axios"]
image: vue.png
---

## 概要

s3バケット内のサブディレクトリにデプロイする機会があり、知りました
ちょっと詰まってしまったため、その際の備忘録です。



## 内容

サブディレクトリ時には、vue側にもそれを知らせてあげる必要があるということです。
(デフォルトではよしなにやってくれない)
といいますか、絶対Pathとなっているので、相対Pathを使う様に明記するだけです。



## vue.config.jsファイル作成

vueプロジェクト直下(root直下)にvue.config.jsの名前でファイルを作成してください

```
root
├── node_modules
├── public
├── src
.
.
.
├── vue.config.js
```

## vue.config.js内容
```
module.exports = {
  publicPath: "./",
```
