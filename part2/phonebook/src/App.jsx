import { useState } from "react"
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  const [nameFilter, setNameFilter] = useState('');
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
      phone: newPhone,
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
