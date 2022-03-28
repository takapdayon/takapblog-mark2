import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../layouts/layout'
import CardList from '../components/cardList'

const TagTemplate: React.VFC<PageProps<GatsbyTypes.TagDataQuery>> = ({ data }) => {
  return (
    <Layout>
      <CardList
        allMdx={data.allMdx}
      />
    </Layout>
  )
}

export const query = graphql`
  query TagData($tag: String) {
    allMdx(
      filter: {frontmatter: {tags: {eq: $tag}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          tags
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
        id
        fields {
          slug
        }
      }
    }
  }
`

export default TagTemplate