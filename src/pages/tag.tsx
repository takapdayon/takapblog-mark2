import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../layouts/layout'
import TagList from '../components/tagList'

const TagPage: React.VFC<PageProps<GatsbyTypes.AllTagsQuery>> = ({ data }) => {
  return (
    <Layout>
      <TagList
        allMdx={data.allMdx}
      />
    </Layout>
  )
}

export const query = graphql`
  query AllTags {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagPage