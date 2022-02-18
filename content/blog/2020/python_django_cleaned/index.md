---
title: Django Cleanでのバリデーション
date: "2020-05-12T12:46:37.121Z"
description: リクエスト側が何でリクエストしてきたかでバリデーションかけたりできるので便利です
tags: ["python", "Django"]
image: django.png
---

## 概要

[前回の記事](../python_django_choicefield)にて、choicefield を用いたバリデーションを紹介いたしました。
今回は clean メソッドを用いたバリデーションについて紹介したいと思います。



## 内容

clean メソッドは 2 つあります。

- clean_fields()
  - 単体の field に対してバリデーションを行いたい時
- clean()
  - 複数の field に対してバリデーションを行いたい時

実行順番なのですが、先に各 clean_fields()が実行され、最後に clean()が実行されます
以下コードになります

### form.py

```py
class Test(forms.Form):

    userid = forms.CharField(label='ユーザID', max_length=50)
    password = forms.CharField(label='パスワード', max_length=50)

    def clean_userid(self):
        userid = self.cleaned_data['userid']
        if '@' in userid:
            raise forms.ValidationError('useridに@を含めることはできません')
        return userid

    def clean_pw(self):
        pw = self.cleaned_data['password']
        if len(pw) < 10:
            raise forms.ValidationError('pwは10文字以上である必要があります')
        return pw

    def clean(self):
        pw = self.cleaned_data['password']
        userid = self.cleaned_data['userid']
        if pw == userid:
            raise forms.ValidationError('pwとuseridは違う値にしてください')
        return self.cleaned_data
```

## clean_field

今回は field2 つ用意しました。

- 1:userid
  - @がユーザ ID に入っている場合にエラーとして返す
- 2:password
  - 文字列の長さが 10 文字に満たない場合にエラーとして返す

## clean

上記が OK だとしても userid と password が同じ物の場合エラーとして返すように

## まとめ

fields のバリデーションでは物足りない場合、独自にバリデーション内容を書きたい場合に clean はとてもいい選択だと思います
是非ご活用くださーい
