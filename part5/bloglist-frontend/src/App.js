import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
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

  const rows = () => (
    <ul>
      {blogs.map(blog => (
        <Blog user={user} key={blog.id} blog={blog} />
      ))}
    </ul>
  )

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const addBlog = async event => {
    event.preventDefault()

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

  return (
    <div>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {user === null ? (
        <LoginForm
          user={user}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <p>
          You are looged in as {user.username}{' '}
          <button onClick={() => logOutHandle()}>log out</button>
        </p>
      )}
      {rows()}
      <BlogForm
        user={user}
        addBlog={addBlog}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
    </div>
  )
}

export default App
