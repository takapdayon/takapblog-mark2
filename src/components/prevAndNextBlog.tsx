import * as React from 'react';
import { Link } from 'gatsby';
import 'twin.macro';
import ShortCard from './shortCard';

const PrevAndNextBlog: React.FC<Props> = ({ next, previous }) => {
  const pathNext = next?.slug;
  const pathPrev = previous?.slug;
  return (
    <div tw="grid gap-4 lg:grid-cols-2">
      {previous && <ShortCard mdx={previous} />}
      {next && <ShortCard mdx={next} />}
    </div>
  );
};

type Props = {
  next: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
  previous: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
};

export default PrevAndNextBlog;
