require('dotenv').config({
    path: '.env'
});
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const uri = `mongodb+srv://hectoringlese:${process.env.MONGO_DB_PASS}@part3.mwpsihu.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri).then(() => {
    console.log('connected to MongoDB');
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
});
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}); module.exports = mongoose.model('Person', personSchema);