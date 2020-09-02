const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {addReview, getReviews, deleteReview} = require('./review.controller')
const { getOrders , getOrder , deleteOrder , addOrder } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrder)
router.delete('/:id',  deleteOrder)
router.post('/',  addOrder)

module.exports = router