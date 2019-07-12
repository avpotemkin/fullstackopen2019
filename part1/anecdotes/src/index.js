import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6)
  }

  const setSelectedToValue = (newValue) => {
    setSelected(newValue)
  }

  const setPointsToValue = (newValue) => {
    setPoints(newValue)
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected]+=1
    setPointsToValue(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day: </h1>  
      {props.anecdotes[selected]}
      <br />
      <br />
      <Button onClick={() => setSelectedToValue(getRandomNumber)} text="Next anecdote"/>
      <Button onClick={() => updatePoints()} text="Vote"/>
      <p>Votes: {points[selected]}</p>
      <h1>Anecdote with the most votes: </h1> 
      {props.anecdotes[points.indexOf(Math.max(...points))]}
      <p>Votes: {Math.max(...points)}</p>
    </div>
  )
}

const Button = ({onClick, text}) => 
    (
        <button onClick={onClick}>{text}</button>
    )


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)