import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import { buscarPorIdErrorInfo, noAuth, nuevoProductoErrorInfo } from "../../services/errors/info.js";
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
                return CustomError.createError({
                    name: "Producto no encontrado en la DB",
                    cause: buscarPorIdErrorInfo(pid),
                    message: "No hubo coincidencias",
                    code: EErrors.INVALID_PARAMS
                })
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
            console.log(existingProduct)

            if (existingProduct) {
                return CustomError.createError({
                    name: "Code ya existe",
                    cause: nuevoProductoErrorInfo(newProduct),
                    message: "Ingreso un productCode que ya existe en nuestra base de datos",
                    code: EErrors.INVALID_PARAMS
                })
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

    eliminarProducto = async (pid, user) => {
        try {

            const product = await productModel.findById({ _id: pid })

            if (!product) {
                return CustomError.createError({
                    name: "Producto no encontrado en la DB",
                    cause: buscarPorIdErrorInfo(pid),
                    message: "No hubo coincidencias",
                    code: EErrors.INVALID_PARAMS
                })
            }
            console.log(user)
            if (product.productOwner != user.email) {
                return CustomError.createError({
                    name: "No puede eliminar un producto que no le pertenece",
                    cause: noAuth(product),
                    message: "Esta intentando borrar un producto que no le pertenece",
                    code: EErrors.NO_AUTH
                })
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