import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import 'twin.macro';
import tw from 'twin.macro';
import TagsElementWrapper from '../wrapper/tagsElementWrapper';
import FlameWrapper from '../wrapper/flameWrapper';

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
      <div tw="p-4 h-auto md:h-40 lg:h-48">
        <div tw="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm my-1">
          {date}
        </div>
        <Link
          to={path!}
          tw="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg no-underline"
        >
          {title}
        </Link>
        <div tw="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
          {description}
        </div>
        <div tw="lg:absolute bottom-0 my-4">
          <TagsElementWrapper tags={tags} />
        </div>
      </div>
    </FlameWrapper>
  );
};

type Props = {
  title: string;
  image: Pick<GatsbyTypes.ImageSharp, 'gatsbyImageData'>;
  date: string;
  description: string;
  tags: GatsbyTypes.Maybe<readonly GatsbyTypes.Maybe<string>[]>;
  path?: string;
};

export default Card;
