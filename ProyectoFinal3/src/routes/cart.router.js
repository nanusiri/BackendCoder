const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { productModel } = require('../models/product.model')
const { cartModel } = require('../models/cart.model')

const carts = []

router.post('/api/carts', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    }

    carts.push(newCart)

    res.json(newCart)
})

router.get('/api/carts/:cid', async (req, res) => {

    try {

        const cid = req.params.cid

        const cart = await cartModel.findById({ _id: cid })

        if (!cart || Object.keys(cart).length === 0) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        return res.json(cart)
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
})

router.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const quantity = parseInt(req.body.quantity || 1)

    const cart = carts.find(cart => cart.id === cid)

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    const existingProduct = cart.products.find(product => product.id === pid)

    if (existingProduct) {
        existingProduct.quantity += quantity
    } else {
        cart.products.push({
            id: pid,
            quantity: quantity
        })
    }

    res.json(cart)
})

router.put('/api/carts/:cid', async (req, res) => {

    try {

        const cid = req.params.cid
        const updateFields = req.body

        const cart = await cartModel.findById({ _id: cid })
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        cart.productos = { ...cart.productos, ...updateFields }

        //cart = updateFields

        let result = await cart.save()

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