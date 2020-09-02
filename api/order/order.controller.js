const logger = require('../../services/logger.service')
const orderService = require('./order.service')

// TODO: needs error handling! try, catch

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })
    }
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    } catch (err) {
        logger.error('Cannot get order', err);
        res.status(500).send({ error: 'cannot get order' })
    }
}
async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete order', err);
        res.status(500).send({ error: 'cannot delete order' })
    }
}

async function addOrder(req, res) {
    try {
        const order = await orderService.add(req.body)
        res.send(order)
    } catch (err) {
        // logger.error('Cannot push order', err);
        res.status(500).send({ error: 'cannot push order' })
    }
}

module.exports = {
    getOrders,
    getOrder,
    deleteOrder,
    addOrder
}