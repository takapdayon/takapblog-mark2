import * as React from 'react';
import 'twin.macro';

import ContainerWrapper from '../wrapper/containerWrapper';
import Icon from '../atom/icon';
import SortIcon from '../moleculres/sortIcon';

const Header: React.FC = () => {
  const headerElement = [
    {
      name: 'home',
      to: '/',
    },
    {
      name: 'portrait',
      to: '/about',
    },
    {
      name: 'tags',
      to: '/tag',
    },
  ];

  return (
    <ContainerWrapper>
      <div tw="flex flex-col md:flex-row items-center justify-between">
        <SortIcon icons={headerElement} />
      </div>
    </ContainerWrapper>
  );
};

export default Header;
