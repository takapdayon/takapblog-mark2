// Step 1: Import React
import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Layout from '../layouts/layout'

// Step 2: Define your component
const IndexPage: React.VFC<PageProps<GatsbyTypes.AllBlogsQuery>> = ({data}) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={node.slug!}>
                {node.frontmatter?.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter?.date}</p>
          </article>
        ))
      }
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
        }
        id
        slug
      }
    }
  }
`

// Step 3: Export your component
export default IndexPage