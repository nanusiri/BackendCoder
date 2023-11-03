import ticketModel from "../models/ticket.model.js";
import Cart from './cart.dao.js'
import Product from "./product.dao.js"


const productService = new Product()
const cartService = new Cart()

export default class Ticket {

    generarTicket = async (cid) => {
        try {

            let cart = await cartService.obtenerCarrito(cid)

            let titularCarrito = cart.titularCarrito

            let products = cart.productos.map(item => item.producto)
            let quantities = cart.productos.map(item => item.quantity)

            let purchaseProducts = []

            let outOfStock = []

            let prices = []

            for (let index = 0; index < products.length; index++) {
                const product = products[index]
                const quantity = quantities[index]
                const result = await productService.obtenerXProducto(product)

                let stock = result.productStock

                if (stock >= quantity) {
                    let newStock = stock - quantity
                    await productService.actualizarStockProducto(product, newStock)
                    let price = result.productPrice
                    prices.push(price)
                    purchaseProducts.push(product)
                } else {
                    outOfStock.push(product);
                }
            }

            if (purchaseProducts.length <= 0) {
                res.status(500).send({ status: "Error", error: "No hay suficiente stock para tu compra" })

            }

            const newTicket = {}

            let amount = 0

            for (let i = 0; i < prices.length; i++) {
                const price = prices[i]
                const quantity = quantities[i]
                amount += price * quantity
            }

            newTicket.amount = amount
            newTicket.purchaser = titularCarrito

            if (outOfStock.length > 0) {
                newTicket.unpurchasedProducts = outOfStock
                let carritoSinStock = cart.productos.filter(item => outOfStock.includes(item.producto))
                cart.productos = carritoSinStock
                await cart.save()
            }

            let result = await ticketModel.create(newTicket)

            return result

        } catch (error) {
            console.error(error);
            return null
        }
    }
}