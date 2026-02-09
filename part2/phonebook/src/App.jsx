import { useEffect, useState } from "react"
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const contactsForDisplay = nameFilter === '' 
  ? persons
  : persons.filter(it => it.name.includes(nameFilter))
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    if (!newPhone.trim()) return

    const nameExists = persons.find(it => it.name === newName);
    if (nameExists) {
      handleUpdatePerson();
      return
    }

    const phoneExists = persons.find(it => it.phone === newPhone);
    if (phoneExists) {
      const errorMessage = `${newPhone} is already added to phonebook`
      alert(errorMessage);
      setNewPhone("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    };
    
    personService
      .create(newPerson)
      .then(response => {
        setPersons(prev => prev.concat(response))
        setNewName('')
        setNewPhone('')
      });
  };

  const handleUpdatePerson = () => {
    const message = `${newName} is already added to the phonebook, replace the old nr with a new one?`
    if (window.confirm(message)) {
      const currentPerson = persons.find(p => p.name === newName);
      const newPerson = {...currentPerson, number: newPhone}
      personService
        .update(newPerson.id, newPerson)
        .then(res => {
          setPersons(prev => prev.map(p => p.id === res.id ? res : p))
          setNewName('')
          setNewPhone('')
        })
    }

  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(person.id)
      .then(() => {
        setPersons(prev => prev.filter(pers => pers.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={nameFilter}
        onChange={e => setNameFilter(e.target.value)}
      />
      <h3>Add a new</h3>
      <Form
        handleFormSubmit={handleSubmit}
        nameValue={newName}
        nameChanged={e => setNewName(e.target.value)}
        phoneValue={newPhone}
        phoneChanged={e => setNewPhone(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsForDisplay} onDelete={handleDelete}/>
    </div>
  )
}

export default App
