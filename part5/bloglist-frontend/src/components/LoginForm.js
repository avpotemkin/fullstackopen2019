import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
