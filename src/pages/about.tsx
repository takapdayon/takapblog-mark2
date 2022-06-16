import * as React from 'react';
import Layout from '../layouts/layout';
import 'twin.macro';
import ContainerWrapper from '../components/containerWrapper';

const AboutPage = () => {
  return (
    <Layout>
      <ContainerWrapper>
        <div tw="prose">
          <div>
            <h2>自己紹介</h2>
            <p>しがないWebエンジニアです。楽しいことをして生きていきたい</p>
            <p>
              お仕事は主にWeb周りのことガシャガシャしてます(元インフラ屋なので、ブログではそちらも記載するかも)
            </p>
          </div>
          <div>
            <h2>ブログについて</h2>
            <p>
              主に個人的な備忘録として、技術面の記事を適当に(適当に)投稿します
            </p>
            <p>後はゲームなども好きなので、そちらのボヤキを投稿するか...も</p>
          </div>
          <div>
            <h2>そのほか</h2>
            <p>(書くことがねぇ...)</p>
            <p>何かありましたらTwitterのDMか、メールお待ちしております</p>
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
};

export default AboutPage;
