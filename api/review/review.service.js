const dbService = require('../../services/db.service');
// const ObjectId = require('mongodb').ObjectId;

module.exports = {
    add
}


async function add(review) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        console.log(review)
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert review`)
        throw err;
    }
}





