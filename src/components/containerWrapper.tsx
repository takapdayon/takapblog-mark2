import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const ContainerWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = tw.div`
  container mx-auto px-0 sm:px-3 2xl:px-6
`;

export default ContainerWrapper;
