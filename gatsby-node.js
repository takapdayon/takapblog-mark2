
const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.tsx`)

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            slug
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: blogPostTemplate,
      context: {
        id: node.id,
      }
    })
  })
}