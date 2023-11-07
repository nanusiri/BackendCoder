const toysSrevice = require('../services/toysServices')
function getAllToys(req, res) {
    const toys = toysSrevice.getAllToys()
    res.json(toys)
}

function createToy(req, res) {
    const newToy = req.body
    toysSrevice.createToy(newToy)
    res.status(201).json(newToy)
}

module.exports = {
    getAllToys,
    createToy
}