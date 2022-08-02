import PropTypes from 'prop-types';
import * as React from 'react';
import { useSiteMetadata } from '../utils/utils';
import Footer from '../components/organisms/footer';
import Header from '../components/organisms/header';
import 'twin.macro';
import tw from 'twin.macro';

const Layout: React.VFC<Props> = ({ children }) => {
  const { site } = useSiteMetadata();
  return (
    <div>
      <HeaderLayout>
        <Header />
      </HeaderLayout>
      <main tw="py-16">{children}</main>
      <Footer />
    </div>
  );
};

type Props = {
  children?: React.ReactNode;
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

const HeaderLayout = tw.div`
  mt-5
`;

export default Layout;
