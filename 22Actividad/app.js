const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

const port = 8080

app.use(cookieParser())

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/login", (req, res) => {
    const token = "Nuevo-Token" //Lo deberiamos crear con jwt

    res.cookie("token", token, { httpOnly: false })

    res.send("Inicio de sesion exitoso")
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})