---
title: AtCoder Abc 162 D
date: "2020-04-12T23:46:37.121Z"
description: RGB Triplets(400点)のpython解法です。
tags: ["atcoder","python"]
image: atcoder.png
---

## 問題

'R','G','B'のみからなる、長さNの文字列Sがあります。
以下の2つの条件をもとに満たす組(i,j,k)(1<=i<=j<=k<=N)の数を求めてください。
* Si != Sj かつ Si != Sk かつ Sj != Skである
* j-i != k-jである


## 制約
* 1 <= N <= 4000
* Sは'R','G','B'のみからなる、長さNの文字列である


## 解法

#### 何を言ってるのか
要は、各文字が別々かつ、幅が同じではない組み合わせは何通りあるかという問題
愚直に三重for
```py
def d162(n , sli):
 
    ans = 0
 
    for i in range(n - 3):
        for w in range(i + 1 , n):
            for q in range(w + 1 , n):
                if sli[i] != sli[w] and sli[i] != sli[q] and sli[w] != sli[q] and w - i != q - w:
                    ans += 1
    return ans
 
def main():
    n = int(input())
    sli = list(str(input()))
    print(d162(n , sli))
if __name__ == '__main__':
    main()
```
->TLEになり不正解

## じゃあどうするか
ここで考えてもらいたいのが、三重for目、何をしているかというと
* 今までの2文字とは違うかどうか
* 長さは同じかどうか

この二つを判定しているわけです。
ならば、R , G , Bそれぞれで出現箇所を把握しておけば、2つ目が確定した以降の残りの数を求めればOK
その為、手順はこんな感じになります
1. 最初に各文字のリストを用意し、それぞれの出現場所を格納します。
2. その後、2文字確定した時点での2文字目の位置を3文字目の挿入位置と比較し、それ以降の数を数える

pythonには便利なライブラリbisect君がいるので
活躍してもらいましょう(他言語では累積和で解けます)

```py
import bisect

def d162(n , sli):

    ans = 0
    Rli = []
    Gli = []
    Bli = []

    for i in range(n):
        if sli[i] == "R":
            Rli.append(i)
        elif sli[i] == "G":
            Gli.append(i)
        else:
            Bli.append(i)

    Rcount = len(Rli)
    Gcount = len(Gli)
    Bcount = len(Bli)
    Rli.sort()
    Gli.sort()
    Bli.sort()

    for i in range(n - 3):
        for w in range(i + 1 , n):
            if sli[i] != sli[w]:
                k = "RGB".replace(sli[i] , "").replace(sli[w] , "")
                if k == "R":
                    ans += Rcount - bisect.bisect_right(Rli , w)
                elif k == "G":
                    ans += Gcount - bisect.bisect_right(Gli , w)
                else:
                    ans += Bcount - bisect.bisect_right(Bli , w)
                if w + w - i < n and sli[w + (w - i)] == k:
                    ans -= 1

    return ans

def main():
    n = int(input())
    sli = list(str(input()))
    print(d162(n , sli))
if __name__ == '__main__':
    main()
```
