import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import ContainerWrapper from '../wrapper/containerWrapper';
import SortIcon from '../moleculres/sortIcon';

const CopyRightFooter = tw.div`
  flex justify-center mt-3 pb-3
`;

const Footer: React.FC = () => {
  const footerElement = [
    {
      name: 'twitter',
      to: 'https://twitter.com/takapdayon',
    },
    {
      name: 'github',
      to: 'https://github.com/takapdayon',
    },
  ];

  return (
    <footer tw="mt-10">
      <ContainerWrapper>
        <div tw="my-3 pt-3">
          <SortIcon icons={footerElement} />
        </div>
        <hr tw="border-gray-700" />
        <CopyRightFooter>
          <span>&copy; 2022 takap</span>
        </CopyRightFooter>
      </ContainerWrapper>
    </footer>
  );
};

export default Footer;
