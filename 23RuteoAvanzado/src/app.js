import express from "express"
import UsersRouter from "./routes/users.js"
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())

const usersRouter = new UsersRouter()
app.use("/users", usersRouter.getRouter())



/* const pets = []

//Middleware para validar que el nombre de la mascota solo contenga letras y espacios
const validatePetName = (req, res, next) => {
    const petName = req.params.pet
    if (/^[a-zA-Z\s]+$/.test(petName)) {
        req.petName = petName
        next()
    } else {
        res.status(400).json({ error: "Debe contener letras y espacios" })
    }
}

//Middleware para buscar una mascota por el nombre
const findPetByName = (req, res, next) => {
    const pet = pets.find((p) => p.name === req.petName)
    if (pet) {
        req.pet = pet
        next()
    } else {
        res.status(404).json({ error: "Mascota no encontrada" })
    }
}

app.post("/", (req, res) => {
    const { name, specie } = req.body
    if (!name || !specie) {
        return res.status(400).json({ error: "Debe ingresar nombre o especie de la mascota" })
    }

    const newPet = { name, specie }

    pets.push(newPet)
    res.status(201).json(newPet)
})

app.get("/:pet", validatePetName, findPetByName, (req, res) => {
    res.json(req.pet)
})

app.put("/:pet", validatePetName, findPetByName, (req, res) => {
    req.pet.adopted = true
    res.json({ msg: "Mascota marcada como adoptada" })
}) */