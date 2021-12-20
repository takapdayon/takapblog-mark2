import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../layouts/Layout';

const BlogPost: React.VFC<PageProps<GatsbyTypes.BlogDataQuery>> = ({ data }) => {
  const image = getImage(data.mdx?.frontmatter?.image?.childImageSharp?.gatsbyImageData!)
  const title = data.mdx?.frontmatter?.title || 'title'
  const date = data.mdx?.frontmatter?.date!
  return (
    <Layout pageTitle={title}>
      <p>{date}</p>
      <GatsbyImage
        image={image!}
        alt={title}
      />
      <MDXRenderer frontmatter={data.mdx?.frontmatter}>
        {data.mdx?.body!}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query BlogData($id: String) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default BlogPost