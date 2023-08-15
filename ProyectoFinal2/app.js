const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require("path")
const PORT = 8080

app.use(express.static(path.join(__dirname, "/public/index.hbs")))

let products = []

io.on("connection", (socket) => {
    socket.emit("productList", products)
    console.log("Nuevo cliente conectado")

    socket.on("newProduct", (product) => {
        products.push(product)
        io.emit("newProduct", { producto: product })
    })
})

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})