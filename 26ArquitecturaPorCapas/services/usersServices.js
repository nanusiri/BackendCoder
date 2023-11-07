const usersData = require('../persistence/usersData')

function getAllUsers() {
    return usersData.getAlllUsers()
}

function createUser(newUser) {
    usersData.createUser(newUser)
}

module.exports = {
    getAllUsers,
    createUser
}