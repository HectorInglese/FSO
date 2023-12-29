const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json());
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))

app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]
//FUNCIONES
//Genera un ID
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0;
    return maxId + 1;
};
//RUTAS
//RUTAS GET
//Ruta principal
app.get('/', (req, res) => {
    res.send('<a href="/api/persons">Persons</a> <br/> <a href="/info">Info</a>');
});
//Ruta GET PARA TODAS LAS PERSONAS
app.get('/api/persons', (req, res) => {
    res.json(persons);
});
//Ruta GET para informacion
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`Phonebook has info for ${persons.length} people <br/> ${date}`);
});
//Ruta GET para una persona
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send('NOT FOUND <br/> <a href="/">Back</a>');
    };
});
//RUTAS POST
//Ruta POST para agregar una persona
app.post('/api/persons', (req, res) => {
    const body = req.body;
    const { name, number } = body;
    if (!name || !number || persons.find(person => person.name === name)) {
        if (!name) {
            return res.status(400).json({
                error: 'Name is missing in the request'
            });
        }
        if (!number) {
            return res.status(400).json({
                error: 'number is missing in the request'
            });
        }
        return res.status(400).json({
            error: 'Name must be unique'
        });
    };
    const newPerson = {
        name: name,
        number: number,
        id: generateId(),
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
});
//RUTAS DELETE
//Ruta DELETE para eliminar una persona
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log(persons);
    res.status(204).end()
});
//PUERTO | RUTA
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));