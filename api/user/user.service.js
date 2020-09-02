const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUserName,
    remove,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find().toArray();
        // users.forEach(user => delete user.password);
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}


async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({"_id":ObjectId(userId)})
        // delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}

async function getByUserName(userName) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({userName})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userName}`)
        throw err;
    }
}

async function remove(userId) {
        const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    try {
            await collection.replaceOne({"_id":user._id}, {$set : user})
            return user
        } catch (err) {
                console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
        user.info = ""
        user.isSeller = false;
        user.imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTuu4dy4fOi7lH5GxvLcdAoyx5Kf5A7EE7mCA&usqp=CAU';
        const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

