import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { IconType } from '@react-icons/all-files'
import 'twin.macro';
import tw from 'twin.macro';

const TagCard: React.FC<Props> = ({ Icon, name, count, size=75, }) => {

  return (
    <div tw="bg-white flex flex-col justify-center items-center rounded-lg overflow-hidden shadow relative w-full shadow-lg hover:shadow-2xl transition-all">
      <div tw="mb-1">
        <Icon color={"#172b4d"} tw="object-center object-cover rounded-full h-36 w-36" />
      </div>
      <div tw="text-center">
        <p tw="text-xl font-bold">{ name }</p>
        <p tw="text-base mb-2 text-gray-400 font-normal">{ count }</p>
      </div>
    </div>
  )
}

const CardConstruct = tw.div`
`

type Props = {
  Icon: IconType,
  name: string,
  count: number,
  size?: number
}

export default TagCard;
