const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')


const { getReviews, getReview, deleteReview, addReview , updateReview} = require('./review.controller')
const router = express.Router()



// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', getReviews)
// router.get('/:id', getReview)
// router.delete('/:id', deleteReview)
router.post('/', addReview)
// router.put('/:id', updateReview)

module.exports = router