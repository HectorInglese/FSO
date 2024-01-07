const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./modules/person');

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

// Middleware for logging request body
morgan.token('body', req => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :body'));

// GET route for all persons
app.get('/api/persons', async (req, res) => {
    const dbpersons = await Person.find({});
    res.json(dbpersons);
});

// GET route for info
app.get('/info', async (req, res) => {
    const count = await Person.countDocuments({});
    const date = new Date();
    res.send(`Phonebook has info for ${count} people <br/> ${date}`);
});

// GET route for a specific person
app.get('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const person = await Person.findById(id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

// POST route to add a person
// POST route to add or update a person
app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body;

    // Check if the person's name already exists in the phonebook
    const existingPerson = await Person.findOne({ name });

    if (existingPerson) {
        // Update the phone number of the existing entry
        const updatedPerson = await Person.findByIdAndUpdate(existingPerson.id, { number }, { new: true });
        res.json(updatedPerson);
    } else {
        // Create a new entry
        const newPerson = new Person({
            name,
            number,
        });

        try {
            const savedPerson = await newPerson.save();
            res.json(savedPerson);
        } catch (error) {
            next(error);
        }
    }
});

// PUT route to update a person
app.put('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id;
    const { name, number } = req.body;

    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, { name, number }, { new: true });
        res.json(updatedPerson);
    } catch (error) {
        next(error);
    }
});

// DELETE route to delete a person
app.delete('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        await Person.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Define error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Malformatted ID' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
};

// Add the error handler middleware to the application
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));