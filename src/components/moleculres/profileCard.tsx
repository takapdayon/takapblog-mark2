import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import AvatarIcon from '../atom/avatarIcon';
import FlameWrapper from '../wrapper/flameWrapper';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import FooterIcon from '../atom/footerIcon';

const ProfileCard: React.FC<Props> = ({}) => {
  const icons = [
    {
      iconName: FaTwitter,
      uri: 'https://twitter.com/takapdayon',
    },
    {
      iconName: FaGithub,
      uri: 'https://github.com/takapdayon',
    },
  ];
  return (
    <FlameWrapper>
      <Profile>
        <div tw="h-auto bg-gray-400 rounded-md pt-4 transition flex flex-col items-center">
          <div tw="rounded-full bg-gray-100 w-28 h-28 p-2">
            <AvatarIcon></AvatarIcon>
          </div>
          <label tw="my-2 font-bold text-gray-100 text-lg">takapp</label>
          <p tw="text-center text-gray-200 m-3 leading-relaxed">
            しがないWebエンジニアです。楽しいことをして生きていきたい。ゲームすることとお酒を飲むのが趣味!
          </p>
          <ul tw="my-5 flex justify-center list-none">
            {icons.map((icon, i) => {
              return (
                <li key={i} tw="mx-4">
                  <FooterIcon Icon={icon.iconName} to={icon.uri} />
                </li>
              );
            })}
          </ul>
        </div>
      </Profile>
    </FlameWrapper>
  );
};

type Props = {};

const Profile = tw.div`
`;

export default ProfileCard;
