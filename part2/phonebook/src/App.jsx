import { useEffect, useState } from "react"
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from './services/persons'
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {

    const showToast = (msg, type) => {
      setMessage(msg)
      setType(type)
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    }

    personService
      .getAll()
      .then(response => {setPersons(response);})
      .catch(err => showToast(err.message, 'error'))

  }, [])

  const contactsForDisplay = nameFilter === '' 
  ? persons
  : persons.filter(it => it.name.includes(nameFilter))

  if (persons.length === 0) {
    return <div>No persons</div>
  }
  
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
        console.log("Ceva aici?")
        setPersons(prev => prev.concat(response))
        setNewName('')
        setNewPhone('')
        const msg = `${newPerson.name} added successfully!`
        showToast(msg, 'success')
      })
      .catch(err => {
        console.log("ceva?")
        const msg = err.response.data.error
        showToast(msg, 'error')
      });
  };

  const showToast = (msg, type) => {
    setMessage(msg)
    setType(type)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 3000)
  }

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
          const msg = `${newName}'s phone changed successfullt to: ${newPhone}!`
          showToast(msg, 'success')
        })
        .catch(() => {
            const msg = `Information of ${newName} has already been removed from server`;
            showToast(msg, 'error')
            setPersons(prev => prev.filter(p => p.id !== newPerson.id))
        });
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
      <Notification message={message} type={type}/>
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
