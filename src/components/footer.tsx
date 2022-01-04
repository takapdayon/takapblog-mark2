import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const Footer: React.FC = () => {
  return (
    <footer>
      <FooterBorder>
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </FooterBorder>
    </footer>
  )
}

const FooterBorder = tw.div`
  bg-gray-900 mt-12
`

export default Footer;