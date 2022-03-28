import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../layouts/layout'
import CardList from '../components/cardList'

const IndexPage: React.VFC<PageProps<GatsbyTypes.AllBlogsQuery>> = ({ data }) => {
  return (
    <Layout>
      <CardList
        allMdx={data.allMdx}
      />
    </Layout>
  )
}

export const query = graphql`
  query AllBlogs {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
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
        slug
      }
    }
  }
`

export default IndexPage