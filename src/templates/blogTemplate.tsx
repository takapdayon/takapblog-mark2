import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { TocItems } from '../components/moleculres/chapterList';
import PrevAndNextBlog from '../components/organisms/prevAndNextBlog';
import Layout from '../layouts/layout';
import ArticleComponents from './articleComponents';
import 'twin.macro';
import tw from 'twin.macro';
import TagsElementWrapper from '../components/moleculres/tagsList';
import ContainerWrapper from '../components/wrapper/containerWrapper';
import FlameWrapper from '../components/wrapper/flameWrapper';
import BlogSideCards from '../components/organisms/blogSideCards';

export type tableOfContentsType =
  | {
      items?: TocItems[];
    }
  | undefined;

type pageContext = {
  next: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
  previous: GatsbyTypes.Maybe<GatsbyTypes.Mdx>;
};

const BlogTemplate: React.VFC<
  PageProps<GatsbyTypes.BlogDataQuery, pageContext>
> = ({ data, pageContext }) => {
  const image = getImage(
    data.mdx?.frontmatter?.image?.childImageSharp?.gatsbyImageData!
  );
  const title = data.mdx?.frontmatter?.title || 'title';
  const date = data.mdx?.frontmatter?.date!;
  const tags = data.mdx?.frontmatter?.tags!;
  const tableOfContents: tableOfContentsType = data.mdx?.tableOfContents;
  const next = pageContext.next;
  const previous = pageContext.previous;
  return (
    <Layout>
      <ContainerWrapper>
        <div tw="grid grid-cols-1 lg:(grid-cols-12 gap-9)">
          <div tw="lg:col-span-8 xl:col-span-9">
            <FlameWrapper>
              <div tw="p-5">
                <h1 tw="font-bold text-2xl sm:text-3xl lg:text-4xl mb-6">
                  {title}
                </h1>
                <p tw="mb-2">{date}</p>
                <div tw="mb-2">
                  <TagsElementWrapper tags={tags} />
                </div>
                <GatsbyImage image={image!} alt={title} tw="mb-20" />
                <article tw="prose lg:prose md:prose-sm sm:prose-sm max-w-none!">
                  <MDXProvider components={ArticleComponents}>
                    <MDXRenderer frontmatter={data.mdx?.frontmatter}>
                      {data.mdx?.body!}
                    </MDXRenderer>
                  </MDXProvider>
                </article>
              </div>
            </FlameWrapper>
            <div tw="py-10">
              <PrevAndNextBlog next={next} previous={previous} />
            </div>
          </div>
          <div tw="hidden lg:(col-span-4 block) xl:col-span-3">
            <BlogSideCards items={tableOfContents?.items}></BlogSideCards>
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
};

export const query = graphql`
  query BlogData($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        tags
        date(formatString: "YYYY/MM/DD")
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
  }
`;

export default BlogTemplate;
