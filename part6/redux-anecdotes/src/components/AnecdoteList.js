import React from 'react'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = id => {
    props.store.dispatch({
      type: 'VOTE',
      id: id
    })
    const votedAnecdote = props.store
      .getState()
      .anecdotes.find(a => a.id === id)
    props.store.dispatch(
      notificationChange(`You voted for '${votedAnecdote.content}'`)
    )
    setTimeout(() => {
      props.store.dispatch(notificationChange(null))
    }, 5000)
  }
  const filteredAnectodes = props.store
    .getState()
    .anecdotes.filter(a => a.content.toLowerCase().includes(props.store.getState().filter.toLowerCase()))

  const listOfAnecdotes =
    props.store.getState().filter === ''
      ? props.store
          .getState()
          .anecdotes.sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))
      : filteredAnectodes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))

  return listOfAnecdotes
}

export default AnecdoteList
