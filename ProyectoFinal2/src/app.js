const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(path.join(__dirname, 'public')))

let products = []

app.get("/", (req, res) => {
    res.render("index.hbs")
})

io.on("connection", (socket) => {
    socket.emit("productList", products)
    console.log("Nuevo cliente conectado")

    socket.on("newProduct", (product) => {
        if (product == '') {

            return

        }
        products.push(product)
        io.emit("newProduct", product)
    })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})