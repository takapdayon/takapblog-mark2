import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaRegEnvelope } from "@react-icons/all-files/fa/FaRegEnvelope"
import { FaTags } from "@react-icons/all-files/fa/FaTags"
import { FaPortrait } from "@react-icons/all-files/fa/FaPortrait"
import { FaRegMoon } from "@react-icons/all-files/fa/FaRegMoon"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import FooterIcon from './atom/footerIcon'
import AvatarIcon from './atom/avatarIcon'

const Header: React.FC = () => {
  const icons = [
    {
      'iconName': FaTwitter,
      'uri': 'https://twitter.com/takapdayon'
    },
    {
      'iconName': FaGithub,
      'uri': 'https://github.com/takapdayon',
    },
    {
      'iconName': FaRegEnvelope,
      'uri': '',
    }
  ];
  return (
    <header tw="">
      <HeaderBorder>
        <div tw="flex flex-col md:flex-row items-center justify-between">
          <div tw="">
            <ul tw="flex justify-center list-none items-center">
              <li tw="mx-4">
                <a href="/">
                  <AvatarIcon />
                </a>
              </li>
              <li tw="mx-4">
                <FooterIcon
                  Icon={FaPortrait}
                  to={'/about'}
                />
              </li>
              <li tw="mx-4">
                <FooterIcon
                  Icon={FaTags}
                  to={'/tag'}
                />
              </li>
            </ul>
          </div>
          {
            /*
          <div tw="">
            <ul tw="flex justify-center list-none items-center">
              <li tw="mx-4">
                <FooterIcon
                  Icon={FaSearch}
                  to={'#'}
                />
              </li>
              <li tw="mx-4">
                <FooterIcon
                  Icon={FaRegMoon}
                  to={'#'}
                />
              </li>
            </ul>
          </div>
            */
          }
        </div>
      </HeaderBorder>
    </header>
  )
}

const HeaderBorder = tw.div`
  container my-4 mx-auto px-0 md:px-4
`

export default Header;