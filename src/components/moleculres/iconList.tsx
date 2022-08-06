import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import Icon from '../atom/icon';

type Props = {
  icons: {
    name: string;
    to: string;
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
            <Icon iconName={icon.name} to={icon.to} />
          </li>
        );
      })}
    </WrapIcon>
  );
};

export default IconList;
