const express = require('express')
const router = express.Router()

const carts = []

router.post('/api/carts', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    }

    carts.push(newCart)

    res.json(newCart)
})

router.get('/api/carts/:cid', (req, res) => {
    const cid = parseInt(req.params.cid)

    const cart = carts.find((cart) => cart.id === cid)
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    return res.json(cart)
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

module.exports = router