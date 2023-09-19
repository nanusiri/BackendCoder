const { Router } = require("express")
const { estudianteModel } = require("../models/estudiante.model")

const router = Router()

router.get("/", async (req, res) => {
    try {
        let estudiantes = await estudianteModel.find()
        res.send({ result: "success", payload: estudiantes })
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    let { nombre, apellido, edad, dni, curso, nota } = req.body

    if (!nombre || !apellido || !edad || !dni || !curso || !nota) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await estudianteModel.create({ nombre, apellido, edad, dni, curso, nota })
    res.send({ result: "success", payload: result })
})

router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let estudianteToReplace = req.body
    if (!estudianteToReplace.nombre || !estudianteToReplace.apellido || !estudianteToReplace.edad || !estudianteToReplace.dni || !estudianteToReplace.curso || !estudianteToReplace.nota) {
        res.send({ status: "Error", error: "faltan parametros" })
    }

    let result = await estudianteModel.updateOne({ _id: uid }, estudianteToReplace)
    res.send({ result: "success", payload: result })
})

router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await estudianteModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

module.exports = router