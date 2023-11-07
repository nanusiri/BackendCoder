const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const port = 8080

app.listen(port, () => {
    console.log(`Servidor corriendeo en el puerto ${port}`)
})

app.use(bodyParser.json())

const toysRoutes = require("./routes/toys.js")
const usersRoutes = require("./routes/users.js")

app.use("/toys", toysRoutes)
app.use("/users", usersRoutes)