import * as React from 'react';
import { IconType } from '@react-icons/all-files';
import 'twin.macro';
import tw from 'twin.macro';
import FlameWrapper from '../wrapper/flameWrapper';

const TagCard: React.FC<Props> = ({ Icon, name, count, size = 100 }) => {
  return (
    <FlameWrapper hoverAction={true}>
      <div tw="my-2 flex flex-col justify-center items-center">
        <Icon color={'#172b4d'} size={size} />
      </div>
      <div tw="text-center">
        <p tw="text-xl font-bold">{name}</p>
        <p tw="text-base mb-2 text-gray-400 font-normal">{count}</p>
      </div>
    </FlameWrapper>
  );
};

const CardConstruct = tw.div`
`;

type Props = {
  Icon: IconType;
  name: string;
  count: number;
  size?: number;
};

export default TagCard;
