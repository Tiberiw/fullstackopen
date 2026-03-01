const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { family: 4 })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(err => console.log('Error connecting to MongoDB', err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'At leas 3 characters are required'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Minimum length is 8'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number is required!']
  }
})

personSchema.set('toJSON', {
  transform: (document, currentObject) => {
    currentObject.id = currentObject._id.toString()
    delete currentObject._id
    delete currentObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)