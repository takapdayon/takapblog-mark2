import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby'
import { FaReact } from "@react-icons/all-files/fa/FaReact"
import TagCard from './atom/tagCard';
import { getPathfromTag } from '../utils/utils'
import 'twin.macro';

const TagList: React.FC<Pick<GatsbyTypes.AllTagsQuery, 'allMdx'>> = ({ allMdx }) => {
  const tags = allMdx.group
  return (
    <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">
      <div tw="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-10">
        {
          tags.map((tag) => {
            return (
              <article key={tag.fieldValue}>
                <Link to={getPathfromTag(tag.fieldValue!)}>
                  <TagCard
                    Icon={FaReact}
                    name={tag.fieldValue}
                    count={tag.totalCount}
                  />
                </Link>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}

export default TagList;