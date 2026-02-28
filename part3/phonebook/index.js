const express = require("express");
const app = express();
var morgan = require('morgan')

app.use(express.json())

app.use(express.static("dist"))

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/info", (req, res) => {
    const size = persons.length;
    const sizeMsg = `<p>Phonebook has info for ${size} people</p>`
    const date = new Date();
    const dateMsg = `${JSON.stringify(date)}`
    const final = `<div>${sizeMsg}<br/>${dateMsg}</div>`
    res.send(final);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const pers = persons.find(it => it.id === id)
    if (pers) {
        res.json(pers);
    } else {
        res.status(404).end()
    }
});

const generateId = () => {
    const currentIds = persons.map(p => +p.id);
    let newId = Math.ceil(Math.random() * 1000000);
    while (currentIds.find(it => it === newId)) {
        newId = Math.ceil(Math.random() * 1000000);
    }
    return String(newId);
}

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!body.number || !body.name) {
        return res.status(400).json({
            error: "invalid request"
        })
    }
    const name = body.name;
    const exists = persons.find(it => it.name === name);
    if (exists) {
        return res.status(400).json({
            error: "name must be unique"
        });
    }
    const newPerson = {
        name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter(it => it.id !== id);
    res.status(204).end()
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));