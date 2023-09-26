const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { productModel } = require('../models/product.model')
const { cartModel } = require('../models/cart.model')


router.post('/api/carts', async (req, res) => {

    try {
        const titular = req.body.titularCarrito

        const cart = await cartModel.create({
            titularCarrito: titular
        })

        return res.send({ result: "success", payload: cart })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
})

router.get('/api/carts/:cid', async (req, res) => {

    try {

        const cid = req.params.cid

        const cart = await cartModel.findById({ _id: cid })

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        return res.send({ result: "success", payload: cart })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
})

router.post('/api/carts/:cid/product/:pid', async (req, res) => {

    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = parseInt(req.body.quantity || 1)

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

        return res.send({ result: "success", payload: cart })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
})

router.put('/api/carts/:cid', async (req, res) => {

    try {

        const cid = req.params.cid
        const updateFields = req.body

        const cart = await cartModel.findByIdAndUpdate({ _id: cid }, { $set: { productos: { ...updateFields } } }, { new: true })
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        cart.productos[0].id = updateFields.productos
        //cart.productos = { ...updateFields }

        //console.log(updateFields.productos)

        //cart.productos = { ...cart.productos, ...updateFields }

        //cart = updateFields

        //let result = await cart.save()

        return res.send({ result: "success", payload: cart })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
})

router.put('/api/carts/:cid/products/:pid', async (req, res) => {

    try {

        const newQuantity = req.body.quantity
        const cid = req.params.cid
        const pid = req.params.pid

        const cart = await cartModel.findById({ _id: cid })
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        const productInCart = cart.productos.find(producto => producto.id === pid)

        if (!productInCart) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        productInCart.quantity = newQuantity

        let result = await cart.save()

        return res.send({ result: "success", payload: cart })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', msg: "Se actualizo la cantidad de unidades de su producto", error: 'Error interno del servidor' });
    }
})

router.delete('/api/carts/:cid/products/:pid', async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid

        const cart = await cartModel.findById({ _id: cid })
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        const productInCart = cart.productos.find(producto => producto.id === pid)

        if (!productInCart) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        cart.productos = cart.productos.filter(producto => producto.id !== pid)

        let result = await cart.save()

        return res.send({ result: "success", msg: "Se elimino el producto solicitado", payload: cart })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }

})

router.delete('/api/carts/:cid', async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid

        const cart = await cartModel.findById({ _id: cid })
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        cart.productos = []

        let result = await cart.save()

        return res.send({ result: "success", msg: "Se elimino todo el contenido del carrito", payload: cart })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }

})

module.exports = router