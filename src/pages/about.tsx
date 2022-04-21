
import * as React from 'react'
import Layout from '../layouts/layout'
import 'twin.macro';


const AboutPage = () => {
  return (
    <Layout>
      <div tw="prose">
        <div>
          <h2>自己紹介</h2>
          <p>しがないエンジニアです。</p>
        </div>
        <div>
          <h2>ブログについて</h2>
          <p>
            適当に個人用に書いていきます。(間違っている箇所のご指摘等は大歓迎です!)
            気軽に書きたいため、主要部分以外は調べずに書くかもしれません...
          </p>
        </div>
        <div>
          <h2>そのほか</h2>
          <p>英語の記事投稿してみたい</p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage