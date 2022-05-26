const path = require('path');
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.tsx`);
  const tagTemplate = path.resolve(`src/templates/tagTemplate.tsx`);

  const result = await graphql(`
    {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            slug
            frontmatter {
              title
            }
          }
          next {
            id
            slug
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
          }
          previous {
            id
            slug
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
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const blogs = result.data.allMdx.edges;

  blogs.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: blogPostTemplate,
      context: {
        id: node.id,
        next,
        previous,
      },
    });
  });

  const tags = result.data.tagsGroup.group;

  tags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
