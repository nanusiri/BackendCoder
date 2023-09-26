const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { productModel } = require('../models/product.model')

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

router.get('/api/products/:pid', async (req, res) => {

    try {
        const pid = req.params.pid

        const product = await productModel.findById({ _id: pid })
        console.log(product)

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        return res.send({ result: "success", payload: product })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }


})

router.post('/api/products', async (req, res) => {

    try {
        const newProduct = req.body

        if (!newProduct.productTitle || !newProduct.productDescription || !newProduct.productCode || !newProduct.productPrice || !newProduct.productStatus || !newProduct.productStock || !newProduct.productCategory) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }

        const existingProduct = await productModel.findOne({ productCode: newProduct.productCode })

        if (existingProduct) {
            return res.status(400).json({ error: 'Ya hay un producto con ese código' })
        }

        let result = await productModel.create(newProduct)

        return res.send({ result: "success", msg: "Producto agregado correctamente", payload: newProduct })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }

})

router.put('/api/products/:pid', async (req, res) => {

    try {
        const pid = req.params.pid
        const updateFields = req.body

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar almenos un campo para actualizar' })
        }

        const result = await productModel.updateOne({ _id: pid }, { $set: updateFields })

        let product = await productModel.findById({ _id: pid })

        return res.send({ result: "success", msg: "Producto modificado correctamente", payload: product });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }

})

router.delete('/api/products/:pid', async (req, res) => {

    try {
        const pid = req.params.pid

        const product = await productModel.findById({ _id: pid })

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        product.deleteOne()

        return res.send({ result: "success", msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }


})


module.exports = router