const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.error('Invalid number of parameters')
  process.exit(1)
}

const addMode = process.argv.length === 5 ? true : false

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.yafav7t.mongodb.net/phonebook?appName=Cluster0`

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (addMode) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save().then(() => {
    const message = `added ${name} number ${number} to phonebook`
    console.log(message)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(results => {
    console.log('phonebook:')
    results.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}


