import { useState } from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const ShowResult = ({ category, count }) => (
  <p>{category} {count}</p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <ShowResult category='Good' count={good} />
      <ShowResult category='Neutral' count={neutral} />
      <ShowResult category='Bad' count={bad} />
      
    </div>
  )
}

export default App