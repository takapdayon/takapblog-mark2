import { IconType } from '@react-icons/all-files'

import * as React from 'react';
import 'twin.macro';

const FooterIcon: React.FC<Props> = ({ Icon, to, size=25 }) => {
  return (
    <a tw="placeholder-gray-600 hover:placeholder-gray-800"
      href={to}
    >
      <Icon size={size} />
    </a>
  )
}

type Props = {
  Icon: IconType,
  to: string,
  size?: number
}

export default FooterIcon;