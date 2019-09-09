import React from 'react'

const AnecdoteList = props => {
  const vote = id => {
    props.store.dispatch({
      type: 'VOTE',
      id: id
    })
  }

  const listOfAnecdotes = props.store
    .getState()
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
