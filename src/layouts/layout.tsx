import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../utils/utils';
import Footer from '../components/footer';
import Header from '../components/header';
import 'twin.macro';

const Layout: React.VFC<Props> = ({ children }) => {
  const { site } = useSiteMetadata();
  return (
    <div>
      <Header />
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

export default Layout;
