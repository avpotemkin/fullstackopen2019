import React, { useState } from 'react'
const Blog = ({ blog, user, handleLikeButton }) => {
  const [visible, setVisible] = useState(true)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (user === null) {
    return null
  } else {
    return (
      <div style={blogStyle}>
        <div style={showWhenVisible}>
          <div onClick={() => setVisible(!visible)}>
            <li>
              "{blog.title}", {blog.author}
            </li>
          </div>
        </div>
        <div style={hideWhenVisible}>
          <li>
            "{blog.title}", {blog.author} <br />
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes{' '}
            <button onClick={() => handleLikeButton(blog)}>like</button> <br />
          </li>
        </div>
      </div>
    )
  }
}

export default Blog
