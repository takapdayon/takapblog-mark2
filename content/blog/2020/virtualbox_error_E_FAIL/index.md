---
title: virtualboxのNot in a hypervisor partition (HVP=0)の解決法
date: "2020-04-22T23:46:37.121Z"
description: なんか、なんでか度々virtualbox起動するとなるんですよねー・・・
tags: ["virtualbox",]
image: virtualbox.jpg
---

## 問題

あー、blog記事書くために仮想環境立ち上げて、docker立ち上げてやるかぁ
と思ってvirtualboxを起動...
そしたらこれ
>Not in a hypervisor partition (HVP=0) 
>AMD-V is disabled in the BIOS

(あーまたか、またこれか(n回目)
なんでかちょくちょくなるんですよね...今日はその解決法2つ挙げたいと思います。

## 解決法

解決法というか、確認してほしい点は2つ
1. BIOSのVirtualization(AMDはSVM)がdisableになってないか
2. hyper-Vが有効になっていないか

僕の場合は大体1ですね、勝手にdisableに変わっちゃうんですよね(なんでだろう...)

