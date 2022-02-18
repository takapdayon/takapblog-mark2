import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Layout from '../layouts/layout'
import CardList from '../components/CardList'

const IndexPage: React.VFC<PageProps<GatsbyTypes.AllBlogsQuery>> = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <CardList
        allBlogs={data}
      />
    </Layout>
  )
}

export const query = graphql`
  query AllBlogs {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          tags
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