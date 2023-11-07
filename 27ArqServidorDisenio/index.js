import express from "express";
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())

app.get("/prueba", (req, res) => {
    res.json("Respuesta")
})

app.listen(8080, () => {
    console.log("Servidor ejecutandose")
})