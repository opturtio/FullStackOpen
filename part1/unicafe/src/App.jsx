import { useState } from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td style={{ paddingRight: '10px' }}>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={props.total} />
          <StatisticLine text="Average" value={props.average.toFixed(1)} />
          <StatisticLine text="Positive" value={`${props.positive.toFixed(1)} %`} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  return (
    <div>
      <Header text="Give Feedback" />
      <Button label="Good" handleClick={() => setGood(good + 1)} />
      <Button label="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button label="Bad" handleClick={() => setBad(bad + 1)} />
      <Header text="Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
