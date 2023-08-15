const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const viewsRouter = require("./routes/views.router")
const app = express()
const PORT = 8080

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, +"/views"))

app.use("/", viewsRouter)

/*let users = [
    {
        nombre: "Nahuel",
        apellido: "Sirimarco",
        edad: 22,
        correo: "nanualejandro@gmail.com",
        telefono: 3814771513
    },
    {
        nombre: "2",
        apellido: "22",
        edad: 111,
        correo: "222",
        telefono: 2222
    }, {
        nombre: "3",
        apellido: "33",
        edad: 333,
        correo: "3333",
        telefono: 33333
    }, {
        nombre: "4",
        apellido: "44",
        edad: 444,
        correo: "4444",
        telefono: 44444
    }, {
        nombre: "5",
        apellido: "55",
        edad: 555,
        correo: "5555",
        telefono: 55555
    },
]

app.get("/", (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * users.length)
    const usuarioSeleccionado = users[numeroAleatorio]
    res.render("index", usuarioSeleccionado)
})*/


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})