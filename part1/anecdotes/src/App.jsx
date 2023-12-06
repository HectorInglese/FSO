import { useState } from 'react'
import ShowcasedText from './components/ShowcasedText';

const App = () => {
  const anecdotes = [
    {
      text: 'If it hurts, do it more often',
      points: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      points: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      points: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      points: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      points: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      points: 0
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      points: 0
    },
    {
      text: 'The only way to go fast, is to go well.',
      points: 0
    },
  ];
  function getRandomInt() {
    const min = Math.ceil(0);
    const max = Math.floor(8);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <br />
      <ShowcasedText text={anecdotes[selected].text} />
      <br />
      <button onClick={() => setSelected(getRandomInt())}>next anecdote</button>
    </div>
  )
};
export default App;