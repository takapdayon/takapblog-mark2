import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const FlameWrapper: React.FC<Props> = ({ hoverAction = false, children }) => {
  const Wrapper = hoverAction
    ? tw.div`
    bg-white rounded-lg overflow-hidden shadow relative w-full shadow-lg transition-all hover:shadow-2xl
  `
    : tw.div`
  bg-white rounded-lg overflow-hidden shadow relative w-full shadow-lg transition-all
  `;
  return <Wrapper>{children}</Wrapper>;
};

type Props = {
  hoverAction?: boolean;
};

export default FlameWrapper;
