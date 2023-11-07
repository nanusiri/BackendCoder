import express from "express"
import { fork } from "child_process"

const app = express()

const port = 8080

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

app.get("/suma", (req, res) => {
    const child = fork('./operacionCompleja.js')
    child.send("Inicio del calculo")
    child.on('message', result => {
        res.send(`El resultado de la operacion es${result}`)
    })

}
)