const express = require('express')
const router = express.Router()

let food = [
    { name: "Hamburguesa", price: 1000 },
    { name: "Lomo", price: 2000 },
    { name: "Picada", price: 30000 }
]

router.get("/", (req, res) => {
    let testUser = {
        name: "Juan",
        lastName: "Perez",
        role: "user"
    }

    res.render("index", {
        user: testUser,
        style: "index.css",//asi agrego el css
        isAdmin: testUser.role === "admin",
        food
    })
})

module.exports = router