import React from "react"
import { Link, graphql } from "gatsby"

const TermBlog = ({ data }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {data.blogs.edges.map(({node}) => (
          <li key={node.path.alias}>
            <Link to={node.path.alias}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    blogs: allNodeArticle(filter: {relationships: {field_tags: {elemMatch: {path: {alias: {eq: $slug}}}}}, moderation_state: {eq: "published"}}) {
      edges {
        node {
          title
          path {
            alias
          }
          id
          nid: drupal_internal__nid
        }
      }
    }
  }
`

export default TermBlog
