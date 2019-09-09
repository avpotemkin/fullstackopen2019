import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import React from 'react'

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(createAnecdote(content))
    props.store.dispatch(notificationChange(`Added new anecdote: ${content}`))
    setTimeout(() => {
        props.store.dispatch(notificationChange(null))
      }, 5000
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
