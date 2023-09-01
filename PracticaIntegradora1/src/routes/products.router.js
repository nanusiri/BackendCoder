const { Router } = require("express")
const { productModel } = require("../models/product.model")

const router = Router()

router.get("/", async (req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success", playload: products })
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    let { nombre, categoria, precio, stock, imagen } = req.body

    if (!nombre || !categoria || !precio || !stock || !imagen) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await productModel.create({ nombre, categoria, precio, stock, imagen })
    res.send({ result: "success", payload: result })
})

router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let productToReplace = req.body
    if (!productToReplace.nombre || !productToReplace.categoria || !productToReplace.precio || !productToReplace.stock || !productToReplace.imagen) {
        res.send({ status: "Error", error: "Faltan parametros" })
    }

    let result = await productModel.updateOne({ _id: uid }, productToReplace)
    res.send({ result: "success", payload: result })
})

router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await productModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

module.exports = router