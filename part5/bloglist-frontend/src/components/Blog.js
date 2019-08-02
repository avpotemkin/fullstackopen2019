import React from 'react'
const Blog = ({ blog, user }) => {
  if (user === null ) {
    return null
  } else {
    return (
      <li>"{blog.title}", {blog.author}</li>
    )
  }
}

export default Blog