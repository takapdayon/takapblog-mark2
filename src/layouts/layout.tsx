import PropTypes from 'prop-types';
import * as React from 'react'
import { Link } from 'gatsby'
import { useSiteMetadata } from '../utils/hooks'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from './layout.module.css'


const Layout: React.VFC<Props> = ({ pageTitle, children }) => {
  const { site } = useSiteMetadata()
  return (
    <div className={container}>
      <title>{pageTitle} | {site?.siteMetadata?.title}</title>
      <header className={siteTitle}>{site?.siteMetadata?.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
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
