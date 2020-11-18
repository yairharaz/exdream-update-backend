const expService = require('./exp.service')


module.exports = {
    getExps,
    getExp,
    deleteExp,
    updateExp,
    addExp,
}
async function getExps(req, res) { 
    const exps = await expService.query(req.query)
    res.send(exps)
}

async function getExp(req, res) {
    const exp = await expService.getById(req.params.id)
    res.send(exp)
}

async function deleteExp(req, res) {
    await expService.remove(req.params.id)
    res.end()
}
async function addExp(req, res) {
    const exp = req.body;
    await expService.add(exp)
    res.send(exp)
}
async function updateExp(req, res) {
    const exp = req.body;
    await expService.update(exp)
    res.send(exp)
}
