import { IconType } from '@react-icons/all-files';
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { FaAws } from "@react-icons/all-files/fa/FaAws"
import { FaMarkdown } from "@react-icons/all-files/fa/FaMarkdown"
import { FaVuejs } from "@react-icons/all-files/fa/FaVuejs"
import { FaPython } from "@react-icons/all-files/fa/FaPython"
import { DiDjango } from "@react-icons/all-files/di/DiDjango";
import { GrGatsbyjs } from "@react-icons/all-files/gr/GrGatsbyjs";


export const takeTagImage = (name: string): IconType => {
  const icon = takeTagInfo(name)
  return icon
}

const takeTagInfo = (name: string): IconType => {
  const tagInfos = [
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
      icon: FaPython
    }
  ]
  const targetIcon = tagInfos.find(x => x.name === name)
  let icon
  if (targetIcon) {
    icon = targetIcon.icon
  } else {
    icon = GrGatsbyjs
  }
  return icon
}

const toUrl = (name: string) => {
  const url = name
  return url
}