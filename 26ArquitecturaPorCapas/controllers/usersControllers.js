const usersServices = require('../services/usersServices')

function getAllUsers(req, res) {
    const users = usersServices.getAllUsers()
    res.json(users)
}

function createUser(req, res) {
    const newUser = req.body
    usersServices.createUser(newUser)
    res.status(201).json(newUser)
}

module.exports = {
    getAllUsers,
    createUser
}