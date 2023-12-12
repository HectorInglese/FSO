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
      id: persons.length + Math.floor(Math.random() * 1000) + 1
    };
    postPerson(newPerson)
      .catch(() => {
        setNotificationMessage(`Information of ${newName.trim()} has already been removed from server`)
      })
      .then(person => {
        setPersons(persons.concat(person))
        setNotificationMessage(`Successfully Added ${newName.trim()}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      });
    setNewName('');
    setNewNumber('');
  };
  const handlePersonDelete = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage(`Successfully Deleted ${persons.find(person => person.id === id).name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
      updatePerson(updatedPerson).then(person => {
        setPersons(persons.map(p => p.id === personId ? person : p))
        setNotificationMessage(`Successfully Updated ${newName.trim()}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }
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