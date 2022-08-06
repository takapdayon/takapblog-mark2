import * as React from 'react';
import 'twin.macro';

import ContainerWrapper from '../wrapper/containerWrapper';
import Icon from '../atom/icon';

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
        <div tw="">
          <ul tw="flex justify-center list-none items-center">
            {headerElement.map(e => {
              return (
                <li tw="mx-4">
                  <Icon iconName={e.name} to={e.to} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Header;
