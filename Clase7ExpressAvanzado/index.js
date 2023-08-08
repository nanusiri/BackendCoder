const express = require("express")
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*app.get("/", (req, res) => {
    res.send("comision 55585")
})
app.post("/api", (req, res) => {
    res.json({
        msg: `POST api`
    })
})
app.put("/api", (req, res) => {
    res.json({
        msg: `PUT api`
    })
})
app.delete("/api", (req, res) => {
    res.json({
        msg: `DELETE api`
    })
})*/
/*const frase = `Hola mundo como estan`

app.get("/api/frase", (req, res) => {
    res.send(frase)
})

app.get("/api/letras/:num", (req, res) => {
    const num = parseInt(req.params.num)
    if (isNaN(num)) {
        res.status(400).json({ error: "El parametro no es un numero" })
    } else if (num < 1 || num > frase.length) {
        res.status(400).json({ error: "El parametro esta fuera de rango" })
    } else {
        const letra = frase.charAt(num - 1)
        res.json({ letra })
    }
})

app.get("/api/palabras/:num", (req, res) => {
    const num = parseInt(req.params.num)
    if (isNaN(num)) {
        res.status(400).json({ error: "El parametro no es un numero" })
    } else {
        const palabras = frase.split(" ")
        if (num < 1 || num > palabras.length) {
            res.status(400).json({ error: "Parametro fuera de rango" })
        } else {
            const palabra = palabras[num - 1]
            res.json({ palabra })
        }
    }
})*/


/*app.get("/api/sumar/:num1/:num2", (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    let suma = num1 + num2
    res.json({ suma })
})

app.get("/api/sumar", (req, res) => {
    const num1 = parseInt(req.query.num1)//Se diferencia de la anterior por que aca tengo query y escribiria la ruta de la siguiente manera:
    const num2 = parseInt(req.query.num2)///api/sumar?num1=5&num2=6 (Ejemplo con 5 y 6)
    const resultado = num1 + num2
    res.json({ resultado })
})

app.get("/api/operacion/:operacion", (req, res) => {
    const operacion = req.params.operacion
    const resultado = eval(operacion)//Utilizamos eval para evaluar la operacion
    res.send(`El resultado de la operacion es: ${resultado}`)
})

app.post("/api", (req, res) => {
    res.send("Ok post")
})

app.put("/api", (req, res) => {
    res.send("Ok put")
})

app.delete('/api', (req, res) => {
    res.send('Ok delete')
})*/


let frase = "Frase inicial"

app.get("/api/frase", (req, res) => {
    res.json({ frase })
})

app.get("/api/palabras/:pos", (req, res) => {
    const posicion = parseInt(req.params.pos)
    if (isNaN(posicion)) {
        res.status(400).json({ error: "El parametro ingresado no es un numero" })
    } else {
        const palabras = frase.split(" ")
        if (posicion < 1 || posicion > palabras.length) {
            res.status(400).json({ error: "El parametro ingresado exede los limites" })
        } else {
            const palabra = palabras[posicion - 1]
            res.json({ palabra })
        }
    }
})

app.post("/api/palabras", (req, res) => {
    const { palabra } = req.body
    if (palabra && typeof palabra === "string") {
        const palabras = frase.split(" ")
        palabras.push(palabra)
        frase = palabras.join(" ")
        res.json({ agregada: palabra, pos: palabras.length, frase })

    } else {
        res.status(400).json({ error: `Campo "palabra" invalido` })
    }
})

app.put("/api/palabras/:pos", (req, res) => {
    const pos = parseInt(req.params.pos, 10)
    const palabras = frase.split(" ")
    if (pos >= 1 && pos <= palabras.length) {
        const palabraNueva = req.body.palabra
        if (palabraNueva) {
            const palabraAnterior = palabras[pos - 1]
            palabras[pos - 1] = palabraNueva
            frase = palabras.join(` `)
            res.json({ actualizada: palabraNueva, anterior: palabraAnterior, frase: frase })
        } else {
            res.status(400).json({ error: `Campo "palabra" requerido en el uerpo de la solicitud` })
        }
    } else {
        res.status(400).json({ error: `Posicion invalida` })
    }
})

app.delete("/api/palabras/:pos", (req, res) => {
    const pos = parseInt(req.params.pos, 10)
    const palabras = frase.split(" ")
    if (pos >= 1 && pos <= palabras.length) {
        const palabraEliminada = palabras.splice(pos - 1, 1)[0]
        frase = palabras.join(" ")
        res.json({ eliminada: palabraEliminada, frase: frase })
    } else {
        res.status(400).json({ error: "Posicion invalida" })
    }
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})