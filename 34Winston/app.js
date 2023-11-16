const express = require("express")
const winston = require("winston")
const { createLogger, format, transports } = winston

const app = express()
const port = 8080

//Configuracion a nivel DESARROLLO
const devLogger = createLogger({
    level: "verbose",
    format: format.simple(),
    transports: [new transports.Console()]
})

//Configuracion a nivel PRODUCCION
const prodLogger = createLogger({
    /* level: "http",
    format: format.simple(), */
    transports: [
        new transports.Console({ level: "http" }),
        new transports.File({
            filename: "./error.log", level: "warn"
        })
    ]
})

//Middleware para seleccionar el entorno
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        req.logger = prodLogger
    } else {
        req.logger = devLogger
    }
    next()
})

//Ruta de prueba
app.get("/", (req, res) => {
    /* req.logger.verbose("Mensaje a nivel verbose")
    req.logger.http("Mensaje a nivel http") */
    req.logger.warn("Mensaje a nivel warn")
    /* req.logger.error("Mensaje a nivel error") */

    res.send("Registros")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})