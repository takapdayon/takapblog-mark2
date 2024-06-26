import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import TagCard from '../moleculres/tagCard';
import { getPathfromTag } from '../../utils/utils';
import 'twin.macro';

const TagCardsList: React.FC<Pick<GatsbyTypes.AllTagsQuery, 'allMdx'>> = ({
  allMdx,
}) => {
  const tags = allMdx.group;
  return (
    <div tw="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-10">
      {tags.map(tag => {
        return (
          <article key={tag.fieldValue}>
            <Link to={getPathfromTag(tag.fieldValue!)}>
              <TagCard name={tag.fieldValue!} count={tag.totalCount} />
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default TagCardsList;
