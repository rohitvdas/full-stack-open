import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({ text, handleClick }) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ name, value }) => {
  return(
    <p>{name} {value}</p>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = good / all

  if(good===0 && neutral===0 && bad===0) {
    return(
      <p>No feedback given</p>
    )
  } 
  
  return(
    <div>
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
      <Statistic name="all" value={all} />
      <Statistic name="average" value={avg} />
      <Statistic name="positive" value={pos} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => { setGood(good+1) }
  const handleNeutral = () => { setNeutral(neutral+1) }
  const handleBad = () => { setBad(bad+1) }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)