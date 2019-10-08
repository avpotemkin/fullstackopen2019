import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'
import React from 'react'

const AnecdoteForm = props => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`Added new anecdote: ${content}`)
    setTimeout(() => {
      props.store.dispatch(notificationChange(null))
    }, 5000)
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

export default connect(
  null,
  { createAnecdote, notificationChange }
)(AnecdoteForm)
