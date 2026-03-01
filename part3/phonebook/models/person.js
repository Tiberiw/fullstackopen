const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

console.log("connecting to", url);

mongoose.connect(url, { family: 4 })
.then(res => console.log('Successfully connected to mongodb'))
.catch(err => console.log('Error connecting to MongoDB', err.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, currentObject) => {
        currentObject.id = currentObject._id.toString();
        delete currentObject._id;
        delete currentObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema)