import React from "react"
import { Link, graphql } from "gatsby"

const Blog = ({ data }) => {
  return (
    <div>
      <h1>{data.blog.title}</h1>
      <div>{data.blog.body.value}</div>
      <div>
        <h2>tags</h2>
        <ul>
          {data.blog.tags.field_tags.map(tag => (
            <li key={tag.path.alias}>
              <Link to={tag.path.alias}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    blog: nodeArticle(path: {alias: {eq: $slug}}) {
      title
      status
      created(formatString: "DD-MMM-YYYY")
      body {
        value
        format
        processed
      }
      tags: relationships {
        field_tags {
          name
          path {
            alias
          }
          drupal_internal__tid
          id
        }
      }
      references:field_references {
        uri
      }
    }
  }
`

export default Blog
