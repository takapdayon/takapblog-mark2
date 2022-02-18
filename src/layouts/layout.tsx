import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../utils/hooks';
import Footer from '../components/footer';
import Header from '../components/header';


const Layout: React.VFC<Props> = ({ pageTitle, children }) => {
  const { site } = useSiteMetadata()
  return (
    <div>
      <Header />
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
      <Footer />
    </div>
  )
}

type Props = {
  pageTitle: string;
  children?: React.ReactNode;
}

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default Layout
