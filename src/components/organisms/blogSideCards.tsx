import * as React from 'react';
import { tableOfContentsType } from 'src/templates/blogTemplate';
import 'twin.macro';
import tw from 'twin.macro';
import ChapterList from '../moleculres/chapterList';
import ProfileCard from '../moleculres/profileCard';

const WrapSideCards = tw.div`
  sticky top-2
`;

const BlogSideCards: React.FC<tableOfContentsType> = ({ items }) => {
  return (
    <WrapSideCards>
      <div tw="mb-5">
        <ProfileCard />
      </div>
      <ChapterList items={items} />
    </WrapSideCards>
  );
};

export default BlogSideCards;
