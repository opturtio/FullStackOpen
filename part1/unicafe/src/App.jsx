import { useState } from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const ShowResult = ({ category, value }) => (
  <p>{category} {value}</p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = total > 0 ? ((good - bad) / total) : 0
  const positive = total > 0 ? ((good / total) * 100) : 0


  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='Give Feedback' />
      <Button label="Good" handleClick={increaseGood} />
      <Button label="Neutral" handleClick={increaseNeutral} />
      <Button label="Bad" handleClick={increaseBad} />
      <Header text='Statistics' />
      <ShowResult category='Good' value={good} />
      <ShowResult category='Neutral' value={neutral} />
      <ShowResult category='Bad' value={bad} />
      <ShowResult category="All" value={total} />
      <ShowResult category="Average" value={average} />
      <ShowResult category="Positive" value={`${positive}%`} />
      
    </div>
  )
}

export default App