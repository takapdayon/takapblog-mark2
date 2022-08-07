import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import ShortCard from '../moleculres/shortCard';

type Props = {
  next: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
  previous: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
};

const dividemdx = (mdx: GatsbyTypes.Maybe<GatsbyTypes.Mdx>) => {
  const title = mdx?.frontmatter?.title ?? 'title';
  const image = mdx?.frontmatter?.image?.childImageSharp;
  const to = mdx?.slug;
  const date = mdx?.frontmatter?.date;
  return { title, image, to, date };
};

const WrapShortCards = tw.div`
  grid gap-4 lg:grid-cols-2
`;

const PrevAndNextBlog: React.FC<Props> = ({ next, previous }) => {
  const preFiltered = dividemdx(previous);
  const nextFiltered = dividemdx(next);

  return (
    <WrapShortCards>
      {previous && (
        <ShortCard
          title={preFiltered.title}
          imageSharp={preFiltered.image}
          to={preFiltered.to}
          date={preFiltered.date}
        />
      )}
      {next && (
        <ShortCard
          title={nextFiltered.title}
          imageSharp={nextFiltered.image}
          to={nextFiltered.to}
          date={nextFiltered.date}
        />
      )}
    </WrapShortCards>
  );
};

export default PrevAndNextBlog;
