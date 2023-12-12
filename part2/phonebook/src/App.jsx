import { useEffect, useState } from 'react';
import './app.css';
import PersonForm from './components/PersonForm';
import PersonsGrid from './components/PersonsGrid';
import QueryFilter from './components/QueryFilter';
import { deletePerson, getPersons, postPerson } from './servives/notesServices';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handlePersonsFilter = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newName.trim() || !newNumber.trim()) {
      alert('Please enter a name and a number')
      setNewName('');
      setNewNumber('');
      return
    }
    if (persons.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to phonebook`)
      setNewName('');
      setNewNumber('');
      return
    }
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    };
    postPerson(newPerson).then(person => { setPersons(persons.concat(person)) });
    setNewName('');
    setNewNumber('');
  };
  const handlePersonDelete = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
    return;
  };

  useEffect(() => {
    getPersons().then(persons => setPersons(persons));
  }, []);

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
      <PersonsGrid handlePersonsFilter={handlePersonsFilter} handlePersonDelete={handlePersonDelete} />
    </div>
  );
};
export default App;