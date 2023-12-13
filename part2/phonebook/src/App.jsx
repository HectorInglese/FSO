import { useEffect, useState } from 'react';
import './app.css';
import PersonForm from './components/PersonForm';
import PersonsGrid from './components/PersonsGrid';
import QueryFilter from './components/QueryFilter';
import { deletePerson, getPersons, postPerson, updatePerson } from './servives/notesServices';
import ErrorComponent from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

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
      handlePersonUpdate()
        .catch(() => {
          setNotificationMessage(`Information of ${newName.trim()} has already been removed from server`)
        })
      setNewName('');
      setNewNumber('');
      return;
    }
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    };
    postPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        displayNotification(`Successfully Added ${newName.trim()}`)
      });
    setNewName('');
    setNewNumber('');
  };
  const handlePersonDelete = (id) => {
    const personName = persons.find(person => person.id === id).name;
    if (confirm(`Delete ${personName}?`)) {
      deletePerson(id)
        .then((person) => {
          if (person.status == 404) {
            displayNotification(`Error : Information of ${personName} has already been removed from server`)
            getPersons().then(persons => { setPersons(persons) });
            return
          }
          setPersons(persons.filter(person => person.id !== id));
          displayNotification(`Successfully Deleted ${persons.find(person => person.id === id).name}`)
        });
    }
    return;
  };
  const handlePersonUpdate = async () => {
    if (confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
      const personId = persons.find(person => person.name === newName.trim()).id;
      const updatedPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: personId
      };
      updatePerson(updatedPerson)
        .then(person => {
          if (person.status == 404) {
            displayNotification(`Error : Information of ${newName.trim()} has already been removed from server`)
            getPersons().then(persons => { setPersons(persons) });
            return
          }
          setPersons(persons.map(p => p.id === personId ? person : p))
          displayNotification(`Successfully Updated ${newName.trim()}`)
        })
    }
  };
  const displayNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  };
  useEffect(() => {
    getPersons().then(persons => { setPersons(persons) });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorComponent message={notificationMessage} />
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