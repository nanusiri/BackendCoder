/*import express from 'express'
import usersRouter from "./routes/users.router.js"
import petsRouter from "./routes/pets.router.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 8080

//Agregar path public
app.use('/static', express.static(__dirname + '/public'))

//Routing
app.use("/", usersRouter)
app.use("/", petsRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})*/

const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const PORT = 8080

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now()
        const originalname = file.originalname
        cb(null, `${timestamp}-${originalname}`)
    }
})

const upload = multer({ storage })

app.use(express.static(path.join(__dirname, "public")))

//manejo subida de archivos
app.post("/uploads", upload.single("archivo"), (req, res) => {
    res.json({ msg: "Archivo subido exitosamente" })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})