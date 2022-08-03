import { IconType } from '@react-icons/all-files';

import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  Icon: IconType;
  to: string;
  size?: number;
};

const WrapIcon = tw.a`
  placeholder-gray-600 hover:placeholder-gray-800
`;

const FooterIcon: React.FC<Props> = ({ Icon, to, size = 25 }) => {
  return (
    <WrapIcon href={to}>
      <Icon size={size} />
    </WrapIcon>
  );
};

export default FooterIcon;
