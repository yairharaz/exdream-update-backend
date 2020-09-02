const MongoClient = require('mongodb').MongoClient;
const config  =  require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'exp_db';
const url = 'mongodb+srv://oryara:o1y2r3@cluster0.nn1n8.mongodb.net/exp_db?retryWrites=true&w=majority'
var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, {useNewUrlParser: true});
        // const client = await MongoClient.connect(config.dbURL, {useNewUrlParser: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch(err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




