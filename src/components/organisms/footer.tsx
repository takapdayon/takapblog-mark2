import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';

import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import FooterIcon from '../atom/footerIcon';
import ContainerWrapper from '../wrapper/containerWrapper';
import IconList from '../moleculres/iconList';

const Footer: React.FC = () => {
  const icons = [
    {
      iconName: FaTwitter,
      uri: 'https://twitter.com/takapdayon',
    },
    {
      iconName: FaGithub,
      uri: 'https://github.com/takapdayon',
    },
  ];

  return (
    <footer tw="mt-10">
      <ContainerWrapper>
        <div tw="my-3 pt-3">
          <IconList icons={icons} />
        </div>
        <hr tw="border-gray-700" />
        <CopyRightFooter>
          <span>&copy; 2022 takap</span>
        </CopyRightFooter>
      </ContainerWrapper>
    </footer>
  );
};

const CopyRightFooter = tw.div`
  flex justify-center mt-3 pb-3
`;

export default Footer;
