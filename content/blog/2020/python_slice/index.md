---
title: pythonでsliceした際の挙動
date: "2020-04-01T12:46:37.121Z"
description: pythonにて文字列操作(slice)する際の気づき、ぼやきです。
tags: ["python"]
image: title.png
---

## 概要

完全にぼやきなんですが、競プロをちろっとやってた時に

```py
  s = "abcde"
  print(s[-1])
  # e
```

となるんですが
スライス使って範囲指定すると

```py
 s = "abcde"
 print(s[1:-1])
 # 誤 bcde
 # 正 bcd
```

ってなるんですよねー
最後の文字まで取りたいときって単体とスライスじゃちょっと違うんですねー
ちなみにスライスで最後まで取りたいときは

```py
 s = "abcde"
 print(s[1:])
 # bcde
```

ってやるっぽいですねー
まぁ、言われてみれば当然っちゃ当然の挙動ですね。

