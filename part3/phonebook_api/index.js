const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person');
app.use(express.json());
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))
app.use(express.static('dist'));
app.use(cors())
//RUTAS
//RUTAS GET
//Ruta GET PARA TODAS LAS PERSONAS
app.get('/api/persons', async (req, res) => {
    const dbpersons = await Person.find({})
    res.json(dbpersons);
});
//Ruta GET para informacion
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`Phonebook has info for ${Person.length} people <br/> ${date}`);
});
//Ruta GET para una persona
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        res.json(person)
    })
});
//RUTAS POST
//Ruta POST para agregar una persona
app.post('/api/persons', (req, res) => {
    const body = req.body;
    const { name, number } = body;
    if (!name || !number || name === '' || number === '') {
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
    const newPerson = new Person({
        name: name,
        number: number,
    });

    newPerson.save().then(savedPerson => {
        res.json(savedPerson);
    })
});
//RUTAS PUT
//Ruta PUT para actualizar una persona
app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const { name, number } = req.body;
    Person.findByIdAndUpdate(id, { name, number }, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        });
});
//RUTAS DELETE
//Ruta DELETE para eliminar una persona
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.deleteOne({ _id: id })
        .then(
            res.status(204).end()
        );
});
//PUERTO | RUTA
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));