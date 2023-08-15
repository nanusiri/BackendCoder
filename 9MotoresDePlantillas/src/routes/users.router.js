import express from 'express'

const router = express.Router()

const users = []

//Endpoints
router.get("/api/users", (req, res) => {
    res.json(users)
})

router.post("/api/users", (req, res) => {
    const newUser = req.body
    users.push(newUser)
    res.json({ msg: "Usuario agregado" })
})


export default router