---
title: Pysparkガチャガチャ集
date: '2021-04-06'
description: Pysparkを使った中で「あー、これどーやんだぁ」って思ったことをまとめておきました
tags: ['spark', 'glue', 'aws', 'pyspark']
image: no-image.png
---

Glue にて、Pyspark を最近よく使っていたのですが、その際に

「あー、このガチャガチャどうやるんかなぁ」って悩んだ時のメモです

# 環境

環境は、[前回の記事内容](../local_glue_docker/)のローカル Glue を使用します

|                | バージョン |
| -------------- | ---------- |
| windows        | 10         |
| docker         | 20.10.5    |
| docker-compose | 1.28.5     |

# Spark ガチャガチャ集

## ネスト構造->フラット構造

ネストされた DF からフラットな DF にしたい場合

```python
def test():
    return "test"
```
