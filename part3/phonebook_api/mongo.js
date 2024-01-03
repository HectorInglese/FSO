const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({
    path: '.env.local'
});
const uri = `mongodb+srv://hectoringlese:${process.env.MONGO_DB_PASS}@part3.mwpsihu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
console.log(uri);
client.connect(uri).then(() => {
    console.log('MongoDB connected');
});

client.close();
return ;