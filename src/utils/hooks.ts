
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