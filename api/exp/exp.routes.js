const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')


const { getExps, getExp, deleteExp, addExp , updateExp } = require('./exp.controller')
const router = express.Router()



// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getExps)

router.get('/:id', getExp)
router.delete('/:id', deleteExp)
router.post('/', addExp)
router.put('/:id', updateExp)

module.exports = router