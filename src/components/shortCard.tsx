import { Link } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import FlameWrapper from './flameWrapper';
import TakeImageOrNoImage from './takeImageOrNoImage';

const ShortCard: React.FC<Props> = ({ mdx }) => {
  const title = mdx?.frontmatter?.title;
  const image = mdx?.frontmatter?.image?.childImageSharp?.gatsbyImageData;
  const path = mdx?.slug;
  const date = mdx?.frontmatter?.date;
  return (
    <FlameWrapper hoverAction={true}>
      <Link to={`/${path}`} tw="flex">
        {image && title && (
          <GatsbyImage
            tw="sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"
            image={image}
            alt={title}
          />
        )}
        <div tw="sm:w-6/12 pl-0 px-5">
          <h4 tw="text-base font-semibold">{title}</h4>
          <p tw="pt-2">{date}</p>
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
