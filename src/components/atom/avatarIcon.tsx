import { IconType } from '@react-icons/all-files';
import * as React from 'react';
import 'twin.macro';
import { StaticImage } from 'gatsby-plugin-image';
import tw from 'twin.macro';

const AvatarIcon: React.FC = () => {
  return (
    <div tw="text-center mb-3">
      <StaticImage
        src="../../images/icon.png"
        alt="avatar"
        tw="rounded-full h-14 w-14 flex items-center justify-center"
      />
    </div>
  );
};

export default AvatarIcon;
