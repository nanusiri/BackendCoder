const { Router } = require("express")
const { userModel } = require("../models/user.model")

const router = Router()

router.get("/", async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "success", playload: users })
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    let { nombre, email, id } = req.body

    if (!nombre || !email || !id) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await userModel.create({ nombre, email, id })
    res.send({ result: "success", payload: result })
})

router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let userToReplace = req.body
    if (!userToReplace.nombre || !userToReplace.email || !userToReplace.id) {
        res.send({ status: "Error", error: "Faltan parametros" })
    }

    let result = await userModel.updateOne({ _id: uid }, userToReplace)
    res.send({ result: "success", payload: result })
})

router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

module.exports = router