import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul>
      {data.blogs.edges.map(({ node }) => (
        <li key={node.path.alias}>
          <Link to={node.path.alias}>{node.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  {
    blogs: allNodeArticle(limit: 10, filter: {status: {eq: true}, moderation_state: {eq: "published"}}) {
      totalCount
      edges {
        node {
          id
          drupal_internal__nid
          title
          created(formatString: "DD-MMM-YYYY")
          path {
            alias
          }
          body {
            format
            summary
            value
          }
          relationships {
            field_tags {
              path {
                alias
              }
              name
              id
              drupal_internal__tid
              status
            }
          }
        }
      }
    }
  }
`

export default IndexPage
