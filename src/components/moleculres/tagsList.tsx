import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import TagElement from '../atom/tagElement';

type Props = {
  tags: GatsbyTypes.Maybe<readonly GatsbyTypes.Maybe<string>[]>;
};

const TagsWrapper = tw.div`
  inline-flex justify-between
`;

const TagsList: React.FC<Props> = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags &&
        tags.map(tag => {
          return tag && <TagElement key={tag} tagName={tag} />;
        })}
    </TagsWrapper>
  );
};

export default TagsList;
