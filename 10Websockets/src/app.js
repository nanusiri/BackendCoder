const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require("path")
const PORT = 8080


//app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "/public")))

let messages = []

//Rutas
/*app.get("/", (req, res) => {
    res.render("index", { title: "Aplicacion Socket IO" })
})*/

//Configuracion de Socket.IO
io.on("connection", (socket) => {
    socket.emit("messageList", messages)
    console.log("Nuevo cliente conectado")

    socket.on("newMessage", (message) => {
        messages.push(message)
        io.emit("newMessage", { socketId: socket.id, mensaje: message })
    })
})

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})