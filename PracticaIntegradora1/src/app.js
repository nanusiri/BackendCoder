const express = require('express')
const mongoose = require('mongoose')
const userRouter = require("./routes/users.router")
const productRouter = require("./routes/products.router")
const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())

mongoose.connect('mongodb+srv://nanualejandro:8KuKbINhsnfZw9zA@e-commerce.wpbtckb.mongodb.net/ecommerce?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conectado a la BD de Mongo Atlas")
    })
    .catch(error => {
        console.error("Error en la conexion", error)
    })

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)