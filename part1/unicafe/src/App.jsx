import { useState } from 'react'
import Statistics from './Statistics';

const App = () => {
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleClick = (event) => {
    setStatistics({ ...statistics, [event.target.name]: statistics[event.target.name] + 1 });
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button name='good' onClick={handleClick}>good</button>
        <button name='neutral' onClick={handleClick}>neutral</button>
        <button name='bad' onClick={handleClick}>bad</button>
      </div>
      <h1>Statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App