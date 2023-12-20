const express = require('express');
const app = express();
var morgan = require('morgan')
app.use(express.json());
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))
let persons = [
    {
        id: 1,
        name: 'John Doe',
        age: 32
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 28
    },
    {
        id: 3,
        name: 'Joe Doe',
        age: 42
    }
];
app.get('/', (req, res) => {
    res.send('<a href="/api/persons">Persons</a> <br/> <a href="/info">Info</a>');
});
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0;
    return maxId + 1;
};
app.post('/api/persons', (req, res) => {
    const body = req.body;
    const { name, age } = body;
    if (!name || !age || persons.find(person => person.name === name)) {
        if (!name) {
            return res.status(400).json({
                error: 'Name is missing in the request'
            });
        }

        if (!age) {
            return res.status(400).json({
                error: 'Age is missing in the request'
            });
        }

        return res.status(400).json({
            error: 'Name must be unique'
        });
    }
    const newPerson = {
        name: name,
        age: age,
        id: generateId(),
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
});
app.get('/api/persons', (req, res) => {
    res.json(persons);
});
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`Phonebook has info for ${persons.length} people <br/> ${date}`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send('NOT FOUND <br/> <a href="/">Back</a>');
    };
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));