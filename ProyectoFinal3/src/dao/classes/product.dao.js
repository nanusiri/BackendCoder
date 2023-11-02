import ProductDTO from "../DTOs/product.dto.js";
import productModel from "../models/product.model.js";

export default class Product {
    obtenerProductos = async (limit, page, sort, query) => {
        try {

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

                return products
            } else if (Object.keys(queryOptions).length === 0) {
                const products = await productModel.paginate({}, { ...options, sort: sortOptions })

                return products
            } else if (Object.keys(sortOptions).length === 0) {
                if (query != "electronicos" && query != "bazar") {
                    return res.status(404).send({ status: "Error", error: "Su query no coincide con nuestra DB" })
                }
                const products = await productModel.paginate(queryOptions, { ...options })

                return products
            } else {
                if (query != "electronicos" && query != "bazar") {
                    return res.status(404).send({ status: "Error", error: "Su query no coincide con nuestra DB" })
                }
                const products = await productModel.paginate(queryOptions, { ...options, sort: sortOptions })

                return products
            }

        } catch (error) {
            console.error(error);
            return null
        }
    }

    obtenerXProducto = async (pid) => {
        try {

            const product = await productModel.findById({ _id: pid })


            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' })
            }

            return product
        } catch (error) {
            console.error(error);
            return null
        }

    }

    nuevoProducto = async (newProduct) => {
        try {

            const existingProduct = await productModel.findOne({ productCode: newProduct.productCode })

            if (existingProduct) {
                return res.status(400).json({ error: 'Ya hay un producto con ese código' })
            }

            let result = await productModel.create(newProduct)

            return result
        } catch (error) {
            console.error(error);
            return null
        }
    }

    actualizarProducto = async (pid, updateFields) => {
        try {

            const result = await productModel.updateOne({ _id: pid }, { $set: updateFields })

            let product = await productModel.findById({ _id: pid })

            return product

        } catch (error) {
            console.error(error);
            return null
        }
    }

    eliminarProducto = async (pid) => {
        try {

            const product = await productModel.findById({ _id: pid })

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' })
            }

            product.deleteOne()

            return product
        } catch (error) {
            console.error(error);
            return null
        }
    }

    actualizarStockProducto = async (pid, newStock) => {
        try {

            let product = await productModel.findById({ _id: pid })

            product.productStock = newStock

            await product.save()

            return product

        } catch (error) {
            console.error(error);
            return null
        }
    }
}