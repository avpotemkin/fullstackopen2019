import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        type: 'error',
        text: 'Wrong credentials'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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
      <ul>
        {blogs.map(blog => (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLikeButton={handleLikeButton}
          />
        ))}
      </ul>
    )
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
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

      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b ))

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
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }

      const updatedBlog = await blogsService.create(blogObject)

      setBlogs(blogs.concat(updatedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setNotification({
        type: 'notification',
        text: `Added the blog ${newTitle} by ${newAuthor}`
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
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
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
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
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
