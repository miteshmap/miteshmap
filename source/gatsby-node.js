/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

// exports.sourceNodes = async ({ actions }) => {
//   const { createNode } = actions
//   // Create nodes here, generally by downloading data
//   // from a remote API.
//   const data = await fetch(REMOTE_API)
//   // Process data into nodes.
//   data.forEach(datum => createNode(processDatum(datum)))
//   // We're done, return.
//   return
// }

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage, createPageDependency } = actions

  const blogTemplate = path.resolve('src/templates/blog.js')
  const termTagTemplate = path.resolve('src/templates/term-blog.js')

  // Query for all nodes to use in creating pages.
  const allBlogs = graphql(
    `
    {
      blogs: allNodeArticle(filter: {moderation_state: {eq: "published"}}) {
        edges {
          node {
            id
            nid: drupal_internal__nid
            title
            path {
              alias
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create pages for each blog.
    result.data.blogs.edges.forEach(({ node }) => {
      const path = node.path.alias
      createPage({
        path,
        component: blogTemplate,
        context: {
          slug: path,
          title: node.title,
        },
      })

      createPageDependency({ path, nodeId: node.nid })
    })
  })

  // Query to get blogs of for given term to use in creating pages.
  const allTermBlogs = graphql(
    `
    {
      terms: allTaxonomyTermTags(filter: {relationships: {node__article: {elemMatch: {moderation_state: {eq: "published"}}}}}) {
        edges {
          node {
            name
            path {
              alias
            }
            id
            tid: drupal_internal__tid
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create pages for each blog.
    result.data.terms.edges.forEach(({ node }) => {
      const path = node.path.alias
      createPage({
        path,
        component: termTagTemplate,
        context: {
          slug: path,
          title: node.title,
        },
      })

      createPageDependency({ path, nodeId: node.tid })
    })
  })

  return Promise.all([allBlogs, allTermBlogs]);
}
