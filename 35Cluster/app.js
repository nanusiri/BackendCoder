import cluster from "cluster"
import { cpus } from "os"
import express from "express"
import { sign } from "crypto"

const port = 8080

const numeroDeProcesadores = cpus().length
//console.log(numeroDeProcesadores)


if (cluster.isPrimary) {
    /* console.log("proceso primerio") */
    for (let i = 0; i < numeroDeProcesadores; i++)
        cluster.fork()
} else {
    /* console.log("no es un proceso primario, es un worker")*/
    console.log(`Worker: ${process.pid}`)
    const app = express()

    app.get("/sencillo", (req, res) => {
        let sum = 0
        for (let i = 0; i < 10000; i++) {
            sum += i
        }
        res.send({ status: "success", msg: `Worker ${process.pid}, resultado ${sum}` })
    })

    app.get("/complejo", (req, res) => {
        let sum = 0
        for (let i = 0; i < 5e8; i++) {
            sum += i
        }
        res.send({ status: "success", msg: `Worker ${process.pid}, resultado ${sum}` })
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

