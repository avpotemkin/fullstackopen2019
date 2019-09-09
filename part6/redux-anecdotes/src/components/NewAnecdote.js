import { createAnecdote } from '../reducers/anecdoteReducer'
import React from 'react'

const NewAnecdote = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(event.target.anecdote.value)
        event.target.anecdote.value = ''
        props.store.dispatch(
            createAnecdote(content)
            )
      }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote