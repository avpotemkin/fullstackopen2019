import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikeButton, handleDeleteButton }) => {
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
              "{blog.title}", {blog.author}
          </div>
        </div>
        <div style={hideWhenVisible}>
            "{blog.title}", {blog.author} <br />
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes{' '} <br />
            added by {blog.user.username} <br />
            <button onClick={() => handleLikeButton(blog)}>like</button> <br />
            { blog.user.username === user.username &&
              <button onClick={() => handleDeleteButton(blog)}>delete</button> }
        </div>
      </div>
    )
  }
}

export default Blog
