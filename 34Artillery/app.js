const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()
const port = 8080
mongoose.connect("mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true })

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("User", UserSchema)

app.post("/test/user", (req, res) => {
    const user = new User({
        username: "Mariabelen",
        email: "mariabelen@mail.com",
        password: "1234"
    })
    user.save()
        .then(() => {
            console.log("Usuario creado")
        })
        .catch((err) => {
            console.error("Error al crear el usuario", err)
        })
})

app.post("/register", (req, res) => {
    res.json({ message: "Usuario registrado" })
})



app.use(express.json())
app.use(bodyParser.json())

/* app.get("/simple", (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i
    }
    res.send({ sum })
})

app.get("/compleja", (req, res) => {
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += i
    }
    res.send({ sum })
}) */

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})