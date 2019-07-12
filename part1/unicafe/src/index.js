import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick = {handleGoodFeedback}/>
      <Button text="Neutral" onClick = {handleNeutralFeedback}/>
      <Button text="Bad" onClick = {handleBadFeedback}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({onClick, text}) => 
(
  <button onClick={onClick}>{text}</button>
)

const Statistic = (props) => {
    const {text, value} = props
    return (
        <tr>{text}
        <td>{value}</td>
        </tr>
        // <p>{text}: {value}</p>
    )
}

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const all = good + neutral + bad
    const average = (good - bad)/all
    const positive = ((good/all) * 100).toFixed(2) + '%'

    if (all > 0) {
        return (
            <table>
                <Statistic text="Good" value={good}/>
                <Statistic text="Neutral" value={neutral}/>
                <Statistic text="Bad" value={bad}/>
                <Statistic text="All" value={all}/>
                <Statistic text="Average" value={average}/>
                <Statistic text="Positive" value={positive}/>
            </table>
        )
    }

    return (
        <p>No feedback given</p>
    )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)