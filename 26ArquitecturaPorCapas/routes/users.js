const express = require("express")
const router = express.Router()
const usersController = require('../controllers/usersControllers')

router.get("/",
    usersController.getAllUsers
)

router.post("/",
    usersController.createUser
)

module.exports = router