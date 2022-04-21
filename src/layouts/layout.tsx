import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../utils/utils';
import Footer from '../components/footer';
import Header from '../components/header';
import 'twin.macro';

const Layout: React.VFC<Props> = ({ children }) => {
  const { site } = useSiteMetadata()
  return (
    <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">
      <Header />
      <main tw="py-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

type Props = {
  children?: React.ReactNode;
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
