const toysData = require('../persistence/toysData')

function getAllToys() {
    return toysData.getAlllToys()
}

function createToy(newToy) {
    toysData.createToy(newToy)
}

module.exports = {
    getAllToys,
    createToy
}