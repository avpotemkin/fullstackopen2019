import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = id => {
    props.store.dispatch({
      type: 'VOTE',
      id: id
    })
    const votedAnecdote = props.anecdotes.find(a => a.id === id)
    props.notificationChange(`You voted for '${votedAnecdote.content}'`)
    setTimeout(() => {
      props.notificationChange(null)
    }, 5000)
  }
  const filteredAnectodes = props.anecdotes.filter(a =>
    a.content.toLowerCase().includes(props.filter.toLowerCase())
  )

  const listOfAnecdotes =
    props.filter === ''
      ? props.anecdotes
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  notificationChange
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
