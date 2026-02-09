import { useEffect, useState } from "react"
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
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
      const errorMessage = `${newName} is already added to phonebook`
      alert(errorMessage);
      setNewName("");
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
      id: crypto.randomUUID()
    };
    setPersons(prev => prev.concat(newPerson))
    setNewName('')
    setNewPhone('')
  };

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
      <Persons persons={contactsForDisplay}/>
    </div>
  )
}

export default App
