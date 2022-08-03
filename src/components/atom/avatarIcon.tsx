import * as React from 'react';
import 'twin.macro';
import { StaticImage } from 'gatsby-plugin-image';

const AvatarIcon: React.FC = () => {
  return (
    <StaticImage
      src="../../images/icon.png"
      alt="avatar"
      tw="rounded-full flex items-center justify-center"
    />
  );
};

export default AvatarIcon;
