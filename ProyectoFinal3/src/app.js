import express from 'express'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import mongoose from 'mongoose'

const app = express();

import config from "./config/config.js"

const port = config.port

app.listen(port, () => console.log(`Example app is active`));

app.use(express.json());

const environment = async () => {
    await mongoose.connect(config.mongoUrl)

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

    /*let cart = await cartModel.findById({ _id: "6511ff22bc9fa62b2a275118" })
    cart.productos.push({ producto: "65010c928bd6c316cd34a75d", quantity: 3 })
    let result = await cartModel.updateOne({ _id: "6511ff22bc9fa62b2a275118" }, cart)*/
}
environment();

app.use("/", cartRouter);
app.use("/", productRouter);