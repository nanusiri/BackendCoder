import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import CustomError from "../../services/errors/CustomError.js";
import { agregarAlCarritoErrorInfo } from "../../services/errors/info.js";
import EErrors from "../../services/errors/enums.js";


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

    agregarProducto = async (cid, pid, quantity, user) => {
        try {

            const cart = await cartModel.findById({ _id: cid })
            const product = await productModel.findById({ _id: pid })

            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' })
            }

            if (user.email == product.productOwner) {
                return CustomError.createError({
                    name: "No puede agregar al carrito un producto que le pertenece",
                    cause: agregarAlCarritoErrorInfo(product),
                    message: "Esta intentando agregar un producto al carrito que ya le pertenece",
                    code: EErrors.NO_AUTH
                })
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

            productInCart.quantity = newQuantity.quantity

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

}