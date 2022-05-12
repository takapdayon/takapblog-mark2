import * as React from 'react';
import { Link } from 'gatsby';
import 'twin.macro';

const PrevAndNextBlog: React.FC<Props> = ({ next, previous }) => {
  const pathNext = next?.slug
  const pathPrev = previous?.slug
  return(
    <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">
      <Link to={`/${pathNext}`}>
        <p>{next?.frontmatter?.title}</p>
      </Link>
      <Link to={`/${pathPrev}`}>
        <p>{previous?.frontmatter?.title}</p>
      </Link>
    </div>
  )
}

type Props = {
  next: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
  previous: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
};

export default PrevAndNextBlog;
