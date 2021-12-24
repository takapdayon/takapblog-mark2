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
      <header>{site?.siteMetadata?.title}</header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/tag">
              Tag
            </Link>
          </li>
        </ul>
      </nav>
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
