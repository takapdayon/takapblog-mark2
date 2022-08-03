import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../layouts/layout';
import TagList from '../components/organisms/tagList';
import ContainerWrapper from '../components/wrapper/containerWrapper';

const TagPage: React.VFC<PageProps<GatsbyTypes.AllTagsQuery>> = ({ data }) => {
  return (
    <Layout>
      <ContainerWrapper>
        <TagList allMdx={data.allMdx} />
      </ContainerWrapper>
    </Layout>
  );
};

export const query = graphql`
  query AllTags {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagPage;
