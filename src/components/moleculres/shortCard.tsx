import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import FlameWrapper from '../wrapper/flameWrapper';

type Props = {
  title?: string;
  imageSharp?: GatsbyTypes.ImageSharp;
  to?: string;
  date?: string;
};

const WrapText = tw.div`
  w-2/3 pl-0 px-5
`;

const Title = tw.h4`
  xl:text-base lg:text-xs font-semibold
`;

const Date = tw.p`
  xl:text-base lg:text-xs pt-2
`;

const ShortCard: React.FC<Props> = ({ title, imageSharp, to, date }) => {
  const image = imageSharp?.gatsbyImageData;
  return (
    <FlameWrapper hoverAction={true}>
      <Link to={`/${to}`} tw="flex">
        {image && title && (
          <GatsbyImage tw="w-1/3 object-cover" image={image} alt={title} />
        )}
        <WrapText>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </WrapText>
      </Link>
    </FlameWrapper>
  );
};

export default ShortCard;
