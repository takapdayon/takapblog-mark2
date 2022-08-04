import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import AvatarIcon from '../atom/avatarIcon';
import FlameWrapper from '../wrapper/flameWrapper';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import FooterIcon from '../atom/footerIcon';
import IconList from './iconList';

type Props = {};

const Profile = tw.div`
  h-auto bg-gray-400 rounded-md pt-4 transition flex flex-col items-center
`;

const WrapIcon = tw.div`
  rounded-full bg-gray-100 w-28 h-28 p-2
`;

const NameLabel = tw.label`
  my-2 font-bold text-gray-100 text-lg
`;

const IntroP = tw.p`
  text-center text-gray-200 m-3 leading-relaxed
`;

const WrapIconList = tw.div`my-5`;

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

  const name = 'takapp';
  const introduce =
    'しがないWebエンジニアです。楽しいことをして生きていきたい。ゲームすることとお酒を飲むのが趣味!';

  return (
    <FlameWrapper>
      <Profile>
        <WrapIcon>
          <AvatarIcon></AvatarIcon>
        </WrapIcon>
        <NameLabel>{name}</NameLabel>
        <IntroP>{introduce}</IntroP>
        <WrapIconList>
          <IconList icons={icons} />
        </WrapIconList>
      </Profile>
    </FlameWrapper>
  );
};

export default ProfileCard;
