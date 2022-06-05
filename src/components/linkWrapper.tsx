import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const LinkWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  );
};

type Props = {};

const Wrapper = tw.div`
`;

export default LinkWrapper;
