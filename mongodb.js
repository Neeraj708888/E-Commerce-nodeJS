const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'; // hostname
const dbName = 'shop'; // Database Name
const client = new MongoClient(url); // create an Object and pass url

async function dbConnect () {
    const result = await client.connect();
    const db = result.db(dbName);
    return db.collection('products');
}

module.exports = dbConnect;

