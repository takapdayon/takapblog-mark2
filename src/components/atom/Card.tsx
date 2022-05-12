import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { getPathfromTag } from '../../utils/utils'
import { FaTag } from "@react-icons/all-files/fa/FaTag"
import 'twin.macro';
import tw from 'twin.macro';

const Card: React.FC<Props> = (props) => {

  const { title, image, date, description, tags, path } = props;

  return (
    <div tw="bg-white rounded-lg overflow-hidden shadow relative w-full shadow-lg hover:shadow-2xl transition-all">
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
        <Link to={path!} tw="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg no-underline">
          {title}
        </Link>
        <div tw="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
          {description}
        </div>
        <div tw="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
          {
            tags.map((tag) => {
              return (
                <Link tw="inline bg-gray-300 mr-2 py-1 px-2 rounded-full text-xs lowercase text-gray-700" to={getPathfromTag(tag)} key={tag}>
                  <FaTag size={10}/>{tag}
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const CardConstruct = tw.div`

`

type Props = {
  title: string;
  image: Pick<GatsbyTypes.ImageSharp, 'gatsbyImageData'>;
  date: string;
  description: string;
  tags: Array<string>;
  path?: string;
}

export default Card;
