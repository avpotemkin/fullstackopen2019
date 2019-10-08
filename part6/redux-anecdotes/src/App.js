import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import anecdotesService from './services/anecdotesService'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdotes }
)(App)
