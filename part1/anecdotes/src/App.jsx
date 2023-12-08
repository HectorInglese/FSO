import { useState } from 'react'
import ShowcasedText from './components/ShowcasedText';

const App = () => {
  const [topAnecdote, setTopAnecdote] = useState('');
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const getRandomInt = () => {
    const min = Math.ceil(0);
    const max = Math.floor(7);
    const anecdoteIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return anecdoteIndex;
  };
  const getTopAnecdote = () => {
    let max = votes[0];
    let index = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        index = i;
      }
    }
    setTopAnecdote(anecdotes[index]);
  };
  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    getTopAnecdote();
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <ShowcasedText text={anecdotes[selected]} />
      <br />
      <button onClick={() => voteForAnecdote()}>
        vote
      </button>
      <button onClick={() => setSelected(getRandomInt())}>next anecdote</button>
      <br />
      <h2>Anecdotes with most votes</h2>
      <p>{topAnecdote ? <>{topAnecdote} <br /> has {votes[anecdotes.indexOf(topAnecdote)]} votes </> : `No votes yet`}</p>
    </div>
  )
};
export default App;