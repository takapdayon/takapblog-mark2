import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../layouts/layout';
import ArticleComponents from './articleComponents'
import 'twin.macro';


const BlogTemplate: React.VFC<PageProps<GatsbyTypes.BlogDataQuery>> = ({ data }) => {
  const image = getImage(data.mdx?.frontmatter?.image?.childImageSharp?.gatsbyImageData!)
  const title = data.mdx?.frontmatter?.title || 'title'
  const date = data.mdx?.frontmatter?.date!
  return (
    <Layout>
      <div>
        <GatsbyImage
          image={image!}
          alt={title}
        />
        <article tw="prose">
          <MDXProvider components={ArticleComponents}>
            <MDXRenderer frontmatter={data.mdx?.frontmatter}>
              {data.mdx?.body!}
            </MDXRenderer>
          </MDXProvider>
        </article>
      </div>
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

export default BlogTemplate