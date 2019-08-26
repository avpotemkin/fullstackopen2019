import React, { useState, useEffect } from 'react'

import './index.css'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useField } from './hooks'
// import SimpleBlog from './components/SimpleBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')

  const newTitle = useField('title')
  const newAuthor = useField('author')
  const newUrl = useField('url')

  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const username = useField('username')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogsService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({
        type: 'error',
        text: 'Wrong credentials'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    username.reset()
    password.reset()
  }

  useEffect(() => {
    blogsService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const logOutHandle = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const rows = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog => (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLikeButton={handleLikeButton}
            handleDeleteButton={handleDeleteButton}
          />
          // <SimpleBlog
          //   key={blog.id}
          //   blog={blog}
          // />
        ))}
      </div>
    )
  }

  const handleDeleteButton = async blog => {
    try {
      const message = `Do you want to delete ${blog.title}?`
      const result = window.confirm(message)
      if (result === true) {
        await blogsService.deleteBlog(String(blog.id))
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification({
          type: 'notification',
          text: `Deleted the blog ${blog.title} by ${blog.author}`
        })

        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } catch (exception) {
      setNotification({
        type: 'error',
        text: `Failed to delete the blog: ${exception}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLikeButton = async blog => {
    try {
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: blog.id
      }

      const updatedBlog = await blogsService.update(String(blog.id), blogObject)

      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
    } catch (exception) {
      setNotification({
        type: 'error',
        text: `Failed to like the blog: ${exception}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogObject = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      }

      const updatedBlog = await blogsService.create(blogObject)

      setBlogs(blogs.concat(updatedBlog))
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()

      setNotification({
        type: 'notification',
        text: `Added the blog ${newTitle.value} by ${newAuthor.value}`
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        type: 'error',
        text: `Failed to add the blog: ${exception}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            user={user}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        user={user}
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          You are loged in as {user.username}{' '}
          <button onClick={() => logOutHandle()}>log out</button>
          {rows()}
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
