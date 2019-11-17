import React from "react"
import { Link, graphql } from "gatsby"

// const Blogs = ({ data }) => <pre>{JSON.stringify(data)}</pre>

const Blogs = ({ data }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {data.blogs.edges.map(({ node }) => (
          <li key={node.path.alias}>
            <Link to={node.path.alias}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

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

export default Blogs
