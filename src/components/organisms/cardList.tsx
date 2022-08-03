import Card from '../moleculres/card';
import * as React from 'react';
import 'twin.macro';

const CardList = <
  T extends
    | Pick<GatsbyTypes.AllBlogsQuery, 'allMdx'>
    | Pick<GatsbyTypes.TagDataQuery, 'allMdx'>
>(
  props: T
) => {
  const blogs = props.allMdx.nodes;
  return (
    <div tw="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10">
      {blogs.map(blog => {
        let path;
        if ('fields' in blog) {
          path = blog.fields?.slug;
        } else {
          path = blog.slug;
        }
        return (
          <article key={blog.id}>
            <Card
              title={blog.frontmatter!.title}
              image={
                blog.frontmatter!.image!
                  .childImageSharp as GatsbyTypes.ImageSharp
              }
              date={blog.frontmatter!.date as string}
              description={blog.frontmatter!.description as string}
              tags={blog.frontmatter?.tags}
              path={path}
            />
          </article>
        );
      })}
    </div>
  );
};

export default CardList;
