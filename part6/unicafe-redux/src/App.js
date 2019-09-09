import React from 'react'

const App = ( {store} ) => {
    const good = () => {
      store.dispatch({
        type: 'GOOD'
      })
    }
  
    const ok = () => {
      store.dispatch({
        type: 'OK'
      })
    }
  
    const bad = () => {
      store.dispatch({
        type: 'BAD'
      })
    }
  
    const reset = () => {
      store.dispatch({
        type: 'RESET'
      })
    }
  
    return (
      <div>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    )
  }

export default App