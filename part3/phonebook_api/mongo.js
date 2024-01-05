const mongoose = require('mongoose');
require('dotenv').config({
    path: '.env'
});

const uri = `mongodb+srv://hectoringlese:${process.env.MONGO_DB_PASS}@part3.mwpsihu.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

const getAll = () => {
    Person.find({})
        .then(result => {
            console.log('phonebook:');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
            console.log('close connection');
        })
        .catch(error => {
            console.error('Error retrieving data:', error);
            mongoose.connection.close();
            console.log('close connection');
        });
};

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(() => {
        if (process.argv[2] === undefined || process.argv[3] === undefined) {
            getAll();
            return;
        }

        const newName = process.argv[2];
        const newNumber = process.argv[3];

        const person = new Person({
            name: newName,
            number: newNumber
        });

        person.save()
            .then(result => {
                console.log(`added ${newName} number ${newNumber} to phonebook`);
                mongoose.connection.close();
                console.log('close connection');
            })
            .catch(error => {
                console.error('Error saving data:', error);
                mongoose.connection.close();
                console.log('close connection');
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });