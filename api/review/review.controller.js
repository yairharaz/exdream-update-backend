const reviewService = require('./review.service')
// const logger = require('../../services/logger.service')


async function addReview(req, res) {
    const review = req.body;
    review.rate = +review.rate
    await reviewService.add(review)
    res.send(review)
}


module.exports = {
   addReview
}