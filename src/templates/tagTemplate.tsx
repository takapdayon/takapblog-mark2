import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../layouts/layout'
import CardList from '../components/cardList'
import 'twin.macro';
import tw from 'twin.macro';

const TagTemplate: React.VFC<PageProps<GatsbyTypes.TagDataQuery, pageContext>> = ({ data, pageContext }) => {
  const tag = pageContext.tag
  return (
    <Layout>
      <TagTitle># {tag}</TagTitle>
      <CardList
        allMdx={data.allMdx}
      />
    </Layout>
  )
}

type pageContext = {
  tag: string
}

const TagTitle = tw.h1`
  text-3xl sm:text-5xl font-bold mx-auto px-0 sm:px-3 2xl:px-6 pb-6
`;

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