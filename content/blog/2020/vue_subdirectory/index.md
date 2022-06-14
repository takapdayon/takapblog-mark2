---
title: vueでデプロイ先がサブディレクトリの場合
date: '2020-08-31T12:46:37.121Z'
description: デプロイ先がサブディレクトリの場合の変更点です
tags: ['vue', 'cors', 'axios']
image: vue-icon.png
---

## 概要

s3 バケット内のサブディレクトリにデプロイする機会があり、知りました
ちょっと詰まってしまったため、その際の備忘録です。

## 内容

サブディレクトリ時には、vue 側にもそれを知らせてあげる必要があるということです。
(デフォルトではよしなにやってくれない)
といいますか、絶対 Path となっているので、相対 Path を使う様に明記するだけです。

## vue.config.js ファイル作成

vue プロジェクト直下(root 直下)に vue.config.js の名前でファイルを作成してください

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

## vue.config.js 内容

```
module.exports = {
  publicPath: "./",
```
