const express = require("express")
const { generateToken, authToken } = require("./utils")
const PRIVATE_KEY = "CoderKey"
const app = express()
const port = 8080

app.use(express.json())//Esto nos sirve para que lea los json del post en postman

const users = []

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    const exists = users.find(user => user.email === email)
    if (exists) return res.status(400).send({ status: "error", error: "El usuario ya existe" })

    const user = {
        name, email, password
    }

    users.push(user)

    const access_token = generateToken(user)

    res.send({ status: "Success", access_token })
})

app.post("/login", (req, res) => {
    const { email, password } = req.body

    const user = users.find(user => user.email === email && user.password === password)
    if (!user) return res.status(400).send({ status: "error", error: "Credencial invalida" })

    const access_token = generateToken(user)

    res.send({ status: "Success", access_token })

})

app.get("/current", authToken, (req, res) => {
    res.send({ status: "success", payload: req.user })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})