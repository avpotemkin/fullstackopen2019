import React from "react"
const BlogForm = (props) => {
  if (props.user === null) {
    return null
  } else {
    return (
      <div>
        <h2>Add a new record:</h2>
        <form onSubmit={props.addBlog}>
          <div>
            title:
            <input value={props.newTitle} onChange={props.handleTitleChange} />
          </div>
          <div>
            author:
            <input
              value={props.newAuthor}
              onChange={props.handleAuthorChange}
            />
          </div>
          <div>
            utl:
            <input
              value={props.newUrl}
              onChange={props.handleUrlChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }
}

export default BlogForm
