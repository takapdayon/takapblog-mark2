import Card from './atom/card';
import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby'
import 'twin.macro';

const CardList: React.FC<Pick<GatsbyTypes.AllBlogsQuery, 'allMdx'>> = ({ allMdx }) => {
  const blogs = allMdx.nodes
  return (
    <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">
      <div tw="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10">
        {
          blogs.map((blog) => {
            return (
              <article key={blog.id}>
                <Card
                  title={blog.frontmatter!.title}
                  image={blog.frontmatter!.image!.childImageSharp as GatsbyTypes.ImageSharp}
                  date={blog.frontmatter!.date as string}
                  description={blog.frontmatter!.description as string}
                  tags={blog.frontmatter?.tags as Array<string>}
                  path={blog.slug}
                />
              </article>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardList;