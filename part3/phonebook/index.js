require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())

app.use(express.static("dist"))

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get("/info", (req, res) => {
    Person.countDocuments({}).then((size) => {
        const sizeMsg = `<p>Phonebook has info for ${size} people</p>`
        const date = new Date();
        const dateMsg = `${JSON.stringify(date)}`
        const final = `<div>${sizeMsg}<br/>${dateMsg}</div>`
        res.send(final);
    });
});

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => res.json(persons))
});

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(400).end()
        }
    })
    .catch(err => next(err))
});

app.post("/api/persons", (req, res, next) => {
    const body = req.body;
    if (!body.number || !body.name) {
        return res.status(400).json({
            error: "invalid request"
        })
    }
    const name = body.name;
    Person.findOne({name}).then(r => {
        if (r) {
            res.status(400).json({error: "name must be unique"});
        } else {
            const newPerson = new Person({
                name,
                number: body.number,
            })

            newPerson.save()
            .then(person => res.json(person))
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
});

app.put("/api/persons/:id", (req, res, next) => {
    const {id, name, number} = req.body;
    if (id !== req.params.id) {
        res.status(400).end()
    }
    Person.findById(req.params.id)
    .then(pers => {
        if (!pers) {
            res.status(404).end()
        }
        pers.number = number
        pers.name = name
        return pers.save().then(result => {
            res.json(result)
        })
    })
    .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(err => next(err))
});

const handleError = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' })
    }

    next(err)
}

app.use(handleError)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));