import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import TagsElementWrapper from '../wrapper/tagsElementWrapper';
import FlameWrapper from '../wrapper/flameWrapper';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  title: string;
  image: Pick<GatsbyTypes.ImageSharp, 'gatsbyImageData'>;
  date: string;
  description: string;
  tags: GatsbyTypes.Maybe<readonly GatsbyTypes.Maybe<string>[]>;
  path?: string;
};

const WrapContext = tw.div`
  p-4 h-auto md:h-40 lg:h-48
`;

const WrapDate = tw.div`
  text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm my-1
`;

const WrapDescription = tw.div`
  text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm
`;

const WrapTags = tw.div`
  lg:absolute bottom-0 my-4
`;

const Card: React.FC<Props> = props => {
  const { title, image, date, description, tags, path } = props;

  return (
    <FlameWrapper hoverAction={true}>
      <Link to={path!}>
        <GatsbyImage
          tw="h-56 w-full object-cover object-center"
          image={image.gatsbyImageData}
          alt={title}
        />
      </Link>
      <WrapContext>
        <WrapDate>{date}</WrapDate>
        <Link
          to={path!}
          tw="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg no-underline"
        >
          {title}
        </Link>
        <WrapDescription>{description}</WrapDescription>
        <WrapTags>
          <TagsElementWrapper tags={tags} />
        </WrapTags>
      </WrapContext>
    </FlameWrapper>
  );
};

export default Card;
