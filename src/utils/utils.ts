import _ from 'lodash'
import { useStaticQuery, graphql } from "gatsby"


export const useSiteMetadata = () => {
  return useStaticQuery<GatsbyTypes.LayoutSiteMetadataQuery>(
    graphql`
      query LayoutSiteMetadata {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
}

export const getPathfromTag = (tag: string): string => {
  return `/tag/${_.kebabCase(tag)}/`
}
