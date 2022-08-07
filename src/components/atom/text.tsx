import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {};

const WrapStr = tw.div`
`;

const Text: React.FC<Props> = ({ str }) => {
  return (
    <WrapStr>
      <div></div>
    </WrapStr>
  );
};

export default Text;
