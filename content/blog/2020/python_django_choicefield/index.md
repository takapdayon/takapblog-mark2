---
title: DjangoでDBの値でバリデーションしたい!
date: "2020-04-23T12:46:37.121Z"
description: Djangoでform等から送られてきたデータに対し、バリデーションしたいけど正規表現とかじゃなく、DBにあるかどうかを確認したいときに便利です。
tags: ["python"]
image: django.png
---

## 概要

form等からデータが送られてきて、バリデーションする際に
「あーこいつDBに値あったら処理するけどないならエラー返すわ」
ってしたいとき便利です。



## 内容

結論から言いますと、Choicefieldを使います。(modelchoicefieldの方)
なんでmodel使うかも流れで説明していきます。



## 実装

formから値貰うtemplateviewはこんな感じ
```py
from forms import Choice
class Test(TemplateView):
    template_name = 'test.html'

    def get(self, request, *args, **kwargs):
        form = Choice(request.GET)
        if not form.is_valid():
            #エラー処理
        #以下正常処理
```


formsはこう
#### ChoiceFieldの場合

```py
from django import forms
from models import *

def get_choice_model_deta():
    choice_data_query = Choice.objects.all()
    Choice_list = choice_data_query.values_list('チェック値', '任意')
    return Choice_list

class Choice(forms.Form):
    form_detail = forms.ChoiceField(choices=get_choice_model_deta())
```


ちょっとまぁ、嫌ですよね・・・
このためだけにグローバル関数作るのもいけ好かない

実際僕これでマジリク出そうと思ったんですけど、OJTの言葉を思い出しました
「フレームワークがこんなめんどくさいことをさせようとするわけがない」

そ、めんどいことはそれなりの対処がされてるんですよ(標準メソッド漁れ)
(コード統一化+車輪の再発明も防げる)

#### ModelChoiceFieldの場合
```py
from django import forms
from models import *

class Choice(forms.Form):
    form_detail = forms.ModelChoiceField(queryset=Choice.objects.all())
```


はい、これだけです。
基本的には、主キーに対してチェックするので、変えたい場合は
```py
to_field_name=''
```

つけて変えていただければと

後は公式ドキュメントに乗ってるので見ていただければ
[ModelChoiceField](https://docs.djangoproject.com/en/3.0/ref/forms/fields/#modelchoicefield)
