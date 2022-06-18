import { FaTags } from '@react-icons/all-files/fa/FaTags';
import { FaPortrait } from '@react-icons/all-files/fa/FaPortrait';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import * as React from 'react';
import 'twin.macro';

import FooterIcon from './atom/footerIcon';
import ContainerWrapper from './containerWrapper';

const Header: React.FC = () => {
  return (
    <ContainerWrapper>
      <div tw="flex flex-col md:flex-row items-center justify-between">
        <div tw="">
          <ul tw="flex justify-center list-none items-center">
            <li tw="mx-4">
              <FooterIcon Icon={FaHome} to={'/'} />
            </li>
            <li tw="mx-4">
              <FooterIcon Icon={FaPortrait} to={'/about'} />
            </li>
            <li tw="mx-4">
              <FooterIcon Icon={FaTags} to={'/tag'} />
            </li>
          </ul>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Header;
