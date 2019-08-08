import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  user,
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange
}) => {
  if (user === null) {
    return null
  } else {
    return (
      <div>
        <h2>Add a new record:</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input value={newTitle} onChange={handleTitleChange} />
          </div>
          <div>
            author:
            <input
              value={newAuthor}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            URL:
            <input value={newUrl} onChange={handleUrlChange} />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogForm
