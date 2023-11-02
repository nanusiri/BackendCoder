import cartModel from "../models/cart.model.js";
/* import Product from "./product.dao.js"

const productService = new Product() */

export default class Cart {
    crearCarrito = async (titularCarrito) => {
        try {

            const result = await cartModel.create(titularCarrito)
            return result

        } catch (error) {

            console.error(error);
            return null

        }
    }

    obtenerCarrito = async (id) => {
        try {

            const cart = await cartModel.findById({ _id: id })

            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            return cart
        } catch (error) {
            console.error(error);
            return null
        }
    }

    agregarProducto = async (cid, pid, quantity) => {
        try {

            const cart = await cartModel.findById({ _id: cid })

            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            const productos = cart.productos

            const existingProductIndex = productos.findIndex(objeto => objeto.producto.equals(pid))

            if (existingProductIndex !== -1) {
                productos[existingProductIndex].quantity += quantity
            } else {
                cart.productos.push({ producto: pid, quantity: quantity })
            }

            await cart.save()

            return cart
        } catch (error) {
            console.error(error);
            return null
        }
    }

    actualizarCarrito = async (cid, updateFields) => {
        try {

            const cart = await cartModel.findByIdAndUpdate({ _id: cid }, { $set: { productos: { ...updateFields } } }, { new: true })
            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            cart.productos[0].id = updateFields.productos

            return cart

        } catch (error) {
            console.error(error);
            return null
        }
    }

    actualizarCantidad = async (newQuantity, cid, pid) => {
        try {

            const cart = await cartModel.findById({ _id: cid })
            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }
            console.log(cart)
            const productInCart = cart.productos.find(producto => producto.producto.equals(pid))
            console.log(productInCart)
            if (!productInCart) {
                return console.log('Producto no encontrado')
            }

            productInCart.quantity = newQuantity

            await cart.save()

            return cart

        } catch (error) {
            console.error(error);
            return null
        }
    }

    eliminarProducto = async (cid, pid) => {
        try {

            const cart = await cartModel.findById({ _id: cid })
            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            const productInCart = cart.productos.find(producto => producto.id === pid)

            if (!productInCart) {
                return res.status(404).json({ error: 'Producto no encontrado' })
            }

            cart.productos = cart.productos.filter(producto => producto.id !== pid)

            await cart.save()

            return cart

        } catch (error) {
            console.error(error);
            return null
        }
    }

    eliminarCarrito = async (cid) => {
        try {

            const cart = await cartModel.findById({ _id: cid })

            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            cart.productos = []

            await cart.save()

            return cart

        } catch (error) {
            console.error(error);
            return null
        }
    }

    /* finalizarCompra = async (cid) => {
        try {
            let cart = await obtenerCarrito(cid)

            let products = cart.productos.map(item => item.producto)
            let quantities = cart.productos.map(item => item.quantity)

            products.forEach(async (product, index) => {
                const result = await productService.obtenerXProducto(product)

                let stock = result.productStock

                if (stock >= quantities[index]) {
                    let newStock = stock - quantities[index]
                    await productService.actualizarStockProducto(product._id, newStock)

                } else {
                    console.log(`No hay suficiente stock para el producto: ${product}`);
                    return
                }
            });

            return 
        } catch (error) {
            console.error(error);
            return null
        }
    } */
}