import CartDTO from '../dao/DTOs/cart.dto.js'
import Cart from '../dao/classes/cart.dao.js'
import Product from "../dao/classes/product.dao.js"
import Ticket from '../dao/classes/ticket.dao.js'


const productService = new Product()
const cartService = new Cart()
const ticketService = new Ticket()

export const crearCarrito = async (req, res) => {
    const titular = req.body

    let cart = new CartDTO(titular)

    let result = await cartService.crearCarrito(cart)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}




export const obtenerCarrito = async (req, res) => {
    const cid = req.params.cid

    let result = await cartService.obtenerCarrito(cid)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}




export const agregarProducto = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = parseInt(req.body.quantity || 1)

    let result = await cartService.agregarProducto(cid, pid, quantity)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}


export const actualizarCarrito = async (req, res) => {
    const cid = req.params.cid
    const updateFields = req.body

    let result = await cartService.agregarProducto(cid, updateFields)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}



export const actualizarCantidad = async (req, res) => {
    const newQuantity = req.body.quantity
    const cid = req.params.cid
    const pid = req.params.pid

    let result = await cartService.actualizarCantidad(newQuantity, cid, pid)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}


export const eliminarProducto = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    let result = await cartService.eliminarProducto(cid, pid)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}


export const eliminarCarrito = async (req, res) => {
    const cid = req.params.cid


    let result = await cartService.eliminarCarrito(cid)
    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })
}


/* export const finalizarCompra = async (req, res) => {
    const cid = req.params.cid

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

        let ticket = await ticketService.generarTicket(titularCarrito, quantities, prices)
        res.send({ result: "success", payload: ticket })
    } catch (error) {
        console.error(error);
        return null
    }


} */

export const finalizarCompra = async (req, res) => {
    const cid = req.params.cid

    let result = await ticketService.generarTicket(cid)

    if (!result) return res.status(500).send({ status: "Error", error: "Algo salió mal" })

    res.send({ result: "success", payload: result })


}