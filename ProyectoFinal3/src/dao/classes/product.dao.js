import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import { buscarPorIdErrorInfo, noAuth, noAuthOwner, nuevoProductoErrorInfo } from "../../services/errors/info.js";
import ProductDTO from "../DTOs/product.dto.js";
import productModel from "../models/product.model.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nanualejandro@gmail.com",
        pass: "xkjh hlev pysq cvvz"
    }
})

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

    nuevoProducto = async (newProduct, user) => {
        try {

            const existingProduct = await productModel.findOne({ productCode: newProduct.productCode })


            if (existingProduct) {
                return CustomError.createError({
                    name: "Code ya existe",
                    cause: nuevoProductoErrorInfo(newProduct),
                    message: "Ingreso un productCode que ya existe en nuestra base de datos",
                    code: EErrors.INVALID_PARAMS
                })
            }

            if (user.role == "premium") {
                newProduct.productOwner = user.email
            }

            let result = await productModel.create(newProduct)

            return result
        } catch (error) {
            console.error(error);
            return null
        }
    }

    actualizarProducto = async (pid, updateFields) => {
        /* try {

            const result = await productModel.updateOne({ _id: pid }, { $set: updateFields })

            let product = await productModel.findById({ _id: pid })

            return product

        } catch (error) {
            console.error(error);
            return null
        } */
        try {
            const options = { new: true }; // Devolver el documento actualizado

            const product = await productModel.findOneAndUpdate(
                { _id: pid },
                { $set: updateFields },
                options
            );

            return product;
        } catch (error) {
            console.error(error);
            return null;
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

            if (product.productOwner != user.email && user.role != "admin") {
                return CustomError.createError({
                    name: "No puede eliminar un producto que no le pertenece",
                    cause: noAuthOwner(product),
                    message: "Esta intentando borrar un producto que no le pertenece",
                    code: EErrors.NO_AUTH
                })
            }

            const mailOptions = {
                from: "nanualejandro@gmail.com",
                to: product.productOwner,
                subject: "Producto Eliminado",
                html: `
                        <div>
                            <h1>Hola ${user.first_name}</h1>
                            <p>El producto: ${product.productTitle}, del que es dueño, ha sido eliminado de nuestra plataforma</p>
                        </div>
                        `
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("correo enviado", info.response)
                }
            })


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