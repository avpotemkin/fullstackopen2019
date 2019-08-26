import React from 'react'

const BlogForm = ({
  user,
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
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
            <input {...newTitle} />
          </div>
          <div>
            author:
            <input {...newAuthor}/>
          </div>
          <div>
            URL:
            <input {...newUrl} />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
      </div>
    )
  }
}

export default BlogForm
