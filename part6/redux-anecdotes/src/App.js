import React from 'react'
import NewAnecdote from './components/NewAnecdote'

const App = (props) => {

  const vote = (id) => {
    props.store.dispatch({
      type: 'VOTE',
      id: id
    })
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {props.store.getState().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <NewAnecdote store={props.store} />
    </div>
  )
}

export default App