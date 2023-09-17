const express = require('express');
const cartRouter = require('./routes/cart.router');
const productRouter = require('./routes/products.router')
const mongoose = require('mongoose');
const { productModel } = require('./models/product.model')
const { cartModel } = require('./models/cart.model')
const mongoosePaginate = require('mongoose-paginate-v2');
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.json());

const environment = async () => {
    await mongoose.connect("mongodb+srv://nanualejandro:JBANIrDkH9EigMcF@e-commerce.ewrans5.mongodb.net/?retryWrites=true&w=majority")

    console.log("Conectado a la base de datos")

    /*let result = await productModel.insertMany([
        { productTitle: "Monitor Led", productDescription: "Monitor 24 pulgadas LED Color negro", productCode: 1, productPrice: 50000, productStatus: true, productStock: 500, productCategory: "electronicos" },
        { productTitle: "Vasos", productDescription: "Vaso de vidrio trasparente", productCode: 2, productPrice: 500, productStatus: true, productStock: 1000, productCategory: "bazar" },
        { productTitle: "Juego de cubiertos", productDescription: "Tenedor, cuchillo y cuchara", productCode: 3, productPrice: 350, productStatus: true, productStock: 2000, productCategory: "bazar" },
        { productTitle: "Teclado", productDescription: "Teclado mecanico con luces led", productCode: 4, productPrice: 30000, productStatus: true, productStock: 800, productCategory: "electronicos" },
        { productTitle: "Platos", productDescription: "Platos blancos de ceramica", productCode: 5, productPrice: 1500, productStatus: true, productStock: 1500, productCategory: "bazar" },
        { productTitle: "Mouse", productDescription: "Mouse inalambrico marca logitech", productCode: 6, productPrice: 15000, productStatus: true, productStock: 3000, productCategory: "electronicos" },
    ])
    console.log(result)*/

    /*let products = await productModel.aggregate([

        { $match: { productCategory: "bazar" } },

        { $group: { _id: "$productTitle", totalStock: { $sum: "$productStock" } } }

    ])

    console.log(products)*/

    /*let products = await productModel.paginate({ productCategory: "electronicos" }, { limit: 1, page: 1 })
    console.log(products)*/

    /*await cartModel.create({
        titularCarrito: "Nahuel Sirimarco"
    })*/

    /*let cart = await cartModel.findById({ _id: "65050d3ba2aad929c4bbfc27" })
    cart.productos.push({ producto: "65010c928bd6c316cd34a762", quantity: 5 })
    let result = await cartModel.updateOne({ _id: "65050d3ba2aad929c4bbfc27" }, cart)*/
}
environment();

app.use("/", cartRouter);
app.use("/", productRouter);