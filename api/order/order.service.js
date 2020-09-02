const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    remove,
    add,
    getById
}

async function query(filter) {
    const criteria = {
        'by._id': filter.userId
    }
    const collection = await dbService.getCollection('order')
    try {
        // const reviews = await collection.find(criteria).toArray();
        var orders = await collection.find(criteria).toArray()   
            
        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }    
}   
async function getById(orderId) {
    const collection = await dbService.getCollection('order')
    try {
        const order = await collection.findOne({"_id":ObjectId(orderId)})
        return order
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }    
}   

async function remove(orderId) {
    const collection = await dbService.getCollection('order')    
    try {
        await collection.deleteOne({"_id":ObjectId(orderId)})    
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)    
        throw err;
    }
}

async function add(order) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);    
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)    
        throw err;
    }
}
// async function query() {
//     // const criteria = _buildCriteria(filterBy)    
//     const collection = await dbService.getCollection('review')
//     try {
//         // const reviews = await collection.find(criteria).toArray();    
//         var reviews = await collection..toArray()

//         reviews = reviews.map(review => {
//             review.byUser = {_id: review.byUser._id, userName: review.byUser.userName}    
//             review.aboutUser = {_id: review.aboutUser._id, userName: review.aboutUser.userName}
//             delete review.byUserId;
//             delete review.aboutUserId;
//             return review;
//         })

//         return reviews
//     } catch (err) {
//         console.log('ERROR: cannot find reviews')    
//         throw err;
//     }
// }



// function _buildCriteria(filterBy) {
//     const criteria = {};    
//     return criteria;
// }


