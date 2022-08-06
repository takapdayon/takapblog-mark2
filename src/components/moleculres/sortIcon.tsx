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

const WrapIcons = tw.ul`
  flex justify-center list-none items-center
`;

const SortIcon: React.FC<Props> = ({ icons }) => {
  return (
    <WrapIcons>
      {icons.map((icon, i) => {
        return (
          <li key={i} tw="mx-4">
            <Icon iconName={icon.name} to={icon.to} />
          </li>
        );
      })}
    </WrapIcons>
  );
};

export default SortIcon;
