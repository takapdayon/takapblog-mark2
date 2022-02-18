import Card from './atom/Card';
import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby'
import 'twin.macro';

const CardList: React.FC<Props> = ({allBlogs}) => {
  return (
    /*
          {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={node.slug!}>
                {node.frontmatter?.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter?.date}</p>
          </article>
        ))
      }
      */
    <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">
      <div tw="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

type Props = {
  blogDatas: GatsbyTypes.AllBlogsQuery
}

export default CardList;