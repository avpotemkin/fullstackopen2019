import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const voteFunction = id => {
    props.vote(id)
    const votedAnecdote = props.anecdotes.find(a => a.id === id)
    props.notificationChange(`You voted for '${votedAnecdote.content}'`)
    setTimeout(() => {
      props.notificationChange(null)
    }, 5000)
  }

  // const filteredAnecdotes = props.anecdotes.filter(a =>
  //   a.content.toLowerCase().includes(props.filter.toLowerCase())
  // )
  console.log(props.anecdotes)
  const listOfAnecdotes = props.anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => voteFunction(anecdote.id)}>vote</button>
        </div>
      </div>
    ))

  // const listOfAnecdotes =
  //   props.filter === ''
  //     ? props.anecdotes
  //         .sort((a, b) => b.votes - a.votes)
  //         .map(anecdote => (
  //           <div key={anecdote.id}>
  //             <div>{anecdote.content}</div>
  //             <div>
  //               has {anecdote.votes} votes
  //               <button onClick={() => voteFunction(anecdote.id)}>vote</button>
  //             </div>
  //           </div>
  //         ))
  //     : filteredAnecdotes
  //         .sort((a, b) => b.votes - a.votes)
  //         .map(anecdote => (
  //           <div key={anecdote.id}>
  //             <div>{anecdote.content}</div>
  //             <div>
  //               has {anecdote.votes}
  //               <button onClick={() => voteFunction(anecdote.id)}>vote</button>
  //             </div>
  //           </div>
  //         ))

  return listOfAnecdotes
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
    // filter: state.filter
  }
}

const mapDispatchToProps = {
  notificationChange,
  vote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
