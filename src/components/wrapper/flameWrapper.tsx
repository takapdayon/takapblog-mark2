import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  hoverAction?: boolean;
};

const WrapFlame = tw.div`
  bg-white rounded-lg overflow-hidden shadow relative w-full shadow-lg transition-all
`;

const WrapFlameWithHover = tw(WrapFlame)`hover:shadow-2xl`;

const FlameWrapper: React.FC<Props> = ({ hoverAction = false, children }) => {
  return (
    <>
      {hoverAction ? (
        <WrapFlame>{children}</WrapFlame>
      ) : (
        <WrapFlameWithHover>{children}</WrapFlameWithHover>
      )}
    </>
  );
};

export default FlameWrapper;
