import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaRegEnvelope } from "@react-icons/all-files/fa/FaRegEnvelope"

import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import FooterIcon from './atom/footerIcon'

const Footer: React.FC = () => {
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
      'uri': '/contact',
    }
  ]
  return (
    <footer tw="mt-10">
      <FooterBorder>
        <div tw="my-3 pt-3">
          <ul tw="flex justify-center list-none">
            {
              icons.map((icon, i) => {
                return (
                  <li key={i} tw="mx-4">
                  <FooterIcon
                    Icon={icon.iconName}
                    to={icon.uri}
                  />
                </li>
                )
              })
            }
          </ul>
        </div>
        <hr tw="border-gray-700" />
        <CopyRightFooter>
          <span>&copy; 2022 takap</span>
        </CopyRightFooter>
      </FooterBorder>
    </footer>
  )
}

const FooterBorder = tw.div`
  container mx-auto px-0 md:px-4
`

const CopyRightFooter = tw.div`
  flex justify-center mt-3 pb-3
`

export default Footer;


/*
      <a href="#!" class="mr-9 text-gray-800">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="facebook-f"
          class="svg-inline--fa fa-facebook-f w-2.5"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          ></path>
        </svg>
      </a>

<footer class="text-center text-white" style="background-color: #f1f1f1;">
  <div class="container pt-9">
    <div class="flex justify-center mb-9">
      <FooterIcon
        Icon={FaRegEnvelope}
        uri={'/contact'}
      />
    </div>
  </div>

  <div class="text-center text-gray-700 p-4" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2021 Copyright:
    <a class="text-gray-800" href="https://tailwind-elements.com/">Tailwind Elements</a>
  </div>
</footer>
*/