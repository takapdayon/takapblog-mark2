import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { IconType } from '@react-icons/all-files';
import { FaReact } from '@react-icons/all-files/fa/FaReact';
import { FaAws } from '@react-icons/all-files/fa/FaAws';
import { FaMarkdown } from '@react-icons/all-files/fa/FaMarkdown';
import { FaVuejs } from '@react-icons/all-files/fa/FaVuejs';
import { FaPython } from '@react-icons/all-files/fa/FaPython';
import { DiDjango } from '@react-icons/all-files/di/DiDjango';
import { FaRegWindowClose } from '@react-icons/all-files/fa/FaRegWindowClose';
import { FaGamepad } from '@react-icons/all-files/fa/FaGamepad';
import { FaDocker } from '@react-icons/all-files/fa/FaDocker';
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord';
import { DiSpark } from '@react-icons/all-files/di/DiSpark';
import { FaTags } from '@react-icons/all-files/fa/FaTags';
import { FaPortrait } from '@react-icons/all-files/fa/FaPortrait';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';

const HelerIcon = (name: string): IconType => {
  const icons = [
    {
      name: 'react',
      icon: FaReact,
    },
    {
      name: 'aws',
      icon: FaAws,
    },
    {
      name: 'Django',
      icon: DiDjango,
    },
    {
      name: 'markdown',
      icon: FaMarkdown,
    },
    {
      name: 'vue',
      icon: FaVuejs,
    },
    {
      name: 'python',
      icon: FaPython,
    },
    {
      name: 'game',
      icon: FaGamepad,
    },
    {
      name: 'docker',
      icon: FaDocker,
    },
    {
      name: 'discord',
      icon: FaDiscord,
    },
    {
      name: 'spark',
      icon: DiSpark,
    },
    {
      name: 'tags',
      icon: FaTags,
    },
    {
      name: 'portrait',
      icon: FaPortrait,
    },
    {
      name: 'home',
      icon: FaHome,
    },
    {
      name: 'twitter',
      icon: FaTwitter,
    },
    {
      name: 'github',
      icon: FaGithub,
    },
  ];
  const targetIcon = icons.find(x => x.name === name);
  if (targetIcon) {
    return targetIcon.icon;
  }
  return FaRegWindowClose;
};

type Props = {
  iconName: string;
  color?: string;
  to?: string;
  size?: number;
  // TODO: cssを受け取れるように変更する
};

const WrapIcon = tw.a`
  placeholder-gray-600 hover:placeholder-gray-800
`;

const Icon: React.FC<Props> = ({ iconName, color, to, size = 25 }) => {
  // WARN: パスカルケースにしないとreturn内で使えんかった...
  const TargetIcon = HelerIcon(iconName);
  return (
    <WrapIcon {...(to && { href: to })}>
      <TargetIcon {...(color && { color: color })} size={size} />
    </WrapIcon>
  );
};

export default Icon;
