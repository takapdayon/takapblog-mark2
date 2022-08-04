import * as React from 'react';
import { IconType } from '@react-icons/all-files/lib';
import FooterIcon from '../atom/footerIcon';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  icons: {
    iconName: IconType;
    uri: string;
  }[];
};

const WrapIcon = tw.div`
  flex justify-center list-none
`;

const IconList: React.FC<Props> = ({ icons }) => {
  return (
    <WrapIcon>
      {icons.map((icon, i) => {
        return (
          <li key={i} tw="mx-4">
            <FooterIcon Icon={icon.iconName} to={icon.uri} />
          </li>
        );
      })}
    </WrapIcon>
  );
};

export default IconList;
