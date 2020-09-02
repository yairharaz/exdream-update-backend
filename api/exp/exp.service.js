const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


async function query(filterBy) {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('exp');
    try {
        const exps = await collection.find(criteria).sort({[filterBy.sortBy] : 1 }).toArray();
        return exps
    } catch (err) {
        console.log('ERROR: cannot find exps')
        throw err;
    }
}

async function getById(expId) {
    const collection = await dbService.getCollection('exp');
    try {
        const exp = await collection.findOne({ "_id": ObjectId(expId) })
        return exp
    } catch (err) {
        console.log(`ERROR: while finding exp ${expId}`)
        throw err;
    }
}

async function remove(expId) {
    const collection = await dbService.getCollection('exp');
    try {
        await collection.deleteOne({ "_id": ObjectId(expId) })
    } catch (err) {
        console.log(`ERROR: cannot remove exp ${expId}`)
        throw err;
    }
}
async function add(exp) {
    const collection = await dbService.getCollection('exp')
    try {
        await collection.insertOne(exp);
        return exp;
    } catch (err) {
        console.log(`ERROR: cannot insert exp`)
        throw err;
    }
}

async function update(exp) {
    const collection = await dbService.getCollection('exp')
    exp._id = ObjectId(exp._id);
    try {
        await collection.replaceOne({ "_id": exp._id }, { $set: exp })
        return exp
    } catch (err) {
        console.log(`ERROR: cannot update exp ${exp._id}`)
        throw err;
    }
}



function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.name_like) {
    // criteria.name = {'$regex': `.*${filterBy.name_like.toLowerCase()}.*\i`} 
    // }
    // db.collection.find( { qty: { $gt: 4 } } )
    if (filterBy.userId !== 'all') { 
        const userId = 'createdBy._id';
        criteria[userId] = filterBy.userId
    }
    if (filterBy.tags) {
        criteria.tags = { $all: filterBy.tags.split(',') }
    }
    if (filterBy.location !== 'all-location') {
        criteria.location = filterBy.location;
    }
    if (filterBy.type !== 'all-type') {
        criteria.type = filterBy.type;
    }
    return criteria;
}

