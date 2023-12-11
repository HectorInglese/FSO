import { useState } from 'react'
import './app.css'
import PersonForm from './components/PersonForm';
import PersonsGrid from './components/PersonsGrid';
import QueryFilter from './components/QueryFilter';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName.trim(), number: newNumber.trim(), id: persons.length + 1 }));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handlePersonsFilter = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <QueryFilter handleFilterChange={handleFilterChange} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <PersonsGrid handlePersonsFilter={handlePersonsFilter} />
    </div>
  );
};
export default App;