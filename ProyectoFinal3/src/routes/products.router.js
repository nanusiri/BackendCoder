const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { productModel } = require('../models/product.model')

const products = []

router.get('/api/products', async (req, res) => {

    try {
        const { limit = 10, page = 1, sort, query } = req.query

        if (isNaN(limit && page)) {
            return res.status(404).send({ status: "Error", error: "Limit y page tienen que ser un numero" })
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page)
        }

        const queryOptions = {}

        if (query) {
            queryOptions.productCategory = query
        }

        const sortOptions = {}

        if (sort === 'desc') {
            sortOptions.productPrice = -1
        } else if (sort === 'asc') {
            sortOptions.productPrice = 1
        }

        if (Object.keys(queryOptions).length === 0 && Object.keys(sortOptions).length === 0) {
            const products = await productModel.paginate({}, { ...options })
            console.log(products)
            return res.send({ result: "success", payload: products })
        } else if (Object.keys(queryOptions).length === 0) {
            const products = await productModel.paginate({}, { ...options, sort: sortOptions })
            console.log(products)
            return res.send({ result: "success", payload: products })
        } else if (Object.keys(sortOptions).length === 0) {
            if (query != "electronicos" && query != "bazar") {
                return res.status(404).send({ status: "Error", error: "Su query no coincide con nuestra DB" })
            }
            const products = await productModel.paginate(queryOptions, { ...options })
            console.log(products)
            return res.send({ result: "success", payload: products })
        } else {
            if (query != "electronicos" && query != "bazar") {
                return res.status(404).send({ status: "Error", error: "Su query no coincide con nuestra DB" })
            }
            const products = await productModel.paginate(queryOptions, { ...options, sort: sortOptions })
            console.log(products)
            return res.send({ result: "success", payload: products })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }

})

router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid)

    const product = products.find((product) => product.id === pid)
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    return res.json(product)
})

router.post('/api/products', (req, res) => {
    const newProduct = req.body

    if (!newProduct.productTitle || !newProduct.productDescription || !newProduct.productCode || !newProduct.productPrice || !newProduct.productStatus || !newProduct.productStock || !newProduct.productCategory) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    newProduct.id = products.length + 1

    newProduct.productPrice = parseFloat(newProduct.productPrice)
    newProduct.productStock = parseInt(newProduct.productStock)

    newProduct.productStatus = newProduct.productStatus === 'true'



    products.push(newProduct)

    res.json({ msg: 'Producto agregado correctamente' })
})

router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid)
    const updateFields = req.body

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar almenos un campo para actualizar' })
    }

    const productIndex = products.findIndex((product) => product.id === pid)

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    }

    return res.json(products[productIndex])
})

router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid)

    const productIndex = products.findIndex((product) => product.id === pid)

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const deleteProduct = products.splice(productIndex, 1)

    return res.json(deleteProduct[0])
})


module.exports = router