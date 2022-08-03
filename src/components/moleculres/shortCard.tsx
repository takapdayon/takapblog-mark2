import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import FlameWrapper from '../wrapper/flameWrapper';

const ShortCard: React.FC<Props> = ({ mdx }) => {
  const title = mdx?.frontmatter?.title;
  const image = mdx?.frontmatter?.image?.childImageSharp?.gatsbyImageData;
  const path = mdx?.slug;
  const date = mdx?.frontmatter?.date;
  return (
    <FlameWrapper hoverAction={true}>
      <Link to={`/${path}`} tw="flex">
        {image && title && (
          <GatsbyImage tw="w-1/2 object-cover" image={image} alt={title} />
        )}
        <div tw="w-1/2 pl-0 px-5">
          <h4 tw="xl:text-base lg:text-xs font-semibold">{title}</h4>
          <p tw="xl:text-base lg:text-xs pt-2">{date}</p>
        </div>
      </Link>
    </FlameWrapper>
  );
};

type Props = {
  mdx: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
};

const Wrapper = tw.div`
`;

export default ShortCard;
