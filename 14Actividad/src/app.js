const express = require('express')
const mongoose = require('mongoose')
const estudiantesRouter = require("./routes/estudiantes.routes")
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())

mongoose.connect('mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conectado a la BD de Mongo Atlas")
    })
    .catch(error => {
        console.error("Error en la conexion", error)
    })

app.use("/api/estudiantes", estudiantesRouter)