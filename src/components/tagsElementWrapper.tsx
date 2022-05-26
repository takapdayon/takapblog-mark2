import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import TagElement from './atom/tagElement';

const TagsElementWrapper: React.FC<Props> = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags &&
        tags.map(tag => {
          return tag && <TagElement tagName={tag} />;
        })}
    </TagsWrapper>
  );
};

type Props = {
  tags: GatsbyTypes.Maybe<readonly GatsbyTypes.Maybe<string>[]>;
};

const TagsWrapper = tw.div`
  relative mt-2 bottom-0 mb-4 md:hidden lg:block
`;

export default TagsElementWrapper;
