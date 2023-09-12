const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const mongoosePaginate = require('mongoose-paginate-v2');
const { productModel } = require('./models/product.model')
const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

const environment = async () => {
    await mongoose.connect("mongodb+srv://nanualejandro:JBANIrDkH9EigMcF@e-commerce.ewrans5.mongodb.net/?retryWrites=true&w=majority")

    console.log("Conectado a la base de datos")
}
environment();

app.use('/', productsRouter)
app.use('/', cartsRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/public', 'index.html'))
})


