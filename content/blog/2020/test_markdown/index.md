---
title: markdownの書き方全般
date: "2020-02-26T23:46:37.121Z"
description: markdown記事での基本的な書き方を買いていこうと思います。
tags: ["ブログ","markdown"]
image: title6.jpg
---

# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6

*イタリック*
_イタリック_
**太字**
__太字__

(空行)
* リスト項目1
+ リスト項目2
- リスト項目3
(空行)

(空行)
1. リスト項目1
2. リスト項目2
3. リスト項目3
(空行)

- リスト1
  - ネスト リスト1_1
     - ネスト リスト1_1_1
     - ネスト リスト1_1_2
  - ネスト リスト1_2
- リスト2
- リスト3


> 白露型駆逐艦の4番艦、夕立です。
> 第3次ソロモン海戦では、結構頑張ったっぽい?
> でも、何気に「アイアンボトム・サウンド」って、ホントに怖い言葉よね?

> 白露型駆逐艦の4番艦、夕立です。
> 第3次ソロモン海戦では、結構頑張ったぽい?
>>でも、何気に「アイアンボトム・サウンド」って、
>>ホントに怖い言葉よね?

```python
def test(testint):
    return "test" + str(testint)
print(test(1))
```


| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

![okayu](http://i.imgur.com/Jjwsc.jpg)

![test](/title6.jpg)

---
***
* * *

[Qiita](http://qiita.com/)
[Yahoo!Japan](http://www.yahoo.co.jp/)

~~取り消し線~~

