import ProductDTO from "../dao/DTOs/product.dto.js"
import Product from "../dao/classes/product.dao.js"

const productService = new Product()

export const obtenerProductos = async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query
    if (isNaN(limit && page)) {
        return res.status(404).send({ status: "Error", error: "Limit y page tienen que ser un numero" })
    }

    let result = await productService.obtenerProductos(limit, page, sort, query)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}

export const obtenerXProducto = async (req, res) => {
    const pid = req.params.pid

    let result = await productService.obtenerXProducto(pid)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}



export const nuevoProducto = async (req, res) => {
    const newProduct = req.body

    /* if (!newProduct.productTitle || !newProduct.productDescription || !newProduct.productCode || !newProduct.productPrice || !newProduct.productStatus || !newProduct.productStock || !newProduct.productCategory) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    } */

    let product = new ProductDTO(newProduct)
    /* console.log(product) */
    let result = await productService.nuevoProducto(product)
    console.log(result)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}



export const actualizarProducto = async (req, res) => {
    const pid = req.params.pid
    const updateFields = req.body

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar almenos un campo para actualizar' })
    }

    let result = await productService.actualizarProducto(pid, updateFields)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}



export const eliminarProducto = async (req, res) => {
    const pid = req.params.pid

    let result = await productService.eliminarProducto(pid)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}

