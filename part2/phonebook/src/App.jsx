import { useState } from 'react'
import './app.css'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handelSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to phonebook`)
      return
    };
    setPersons(persons.concat({ name: newName.trim() }));
    setNewName('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => handelSubmit(event)}>
        <div>
          name: <input
            required
            value={newName}
            onChange={(event) => handleNameChange(event)}
          />
          <br />
          phone:
          <input
            required
            value={newNumber}
            onChange={(event) => handleNumberChange(event)}
          />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <table>
        <th colSpan="2">Numbers</th>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
        {persons.map((person) => (
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default App;