import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const Wrapper = tw.div`
  container mx-auto px-0 sm:px-3 2xl:px-6
`;

const MobileMargin = tw.div`
  mx-3 md:mx-0
`;

const ContainerWrapper: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <MobileMargin>{children}</MobileMargin>
    </Wrapper>
  );
};

export default ContainerWrapper;
