import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  children: React.ReactNode;
};

const WrapElement = tw.div`
  container mx-auto px-0 sm:px-3 2xl:px-6
`;

const ElementWrapper: React.FC<Props> = ({ children }) => {
  return <WrapElement>{children}</WrapElement>;
};

export default ElementWrapper;
