const express = require('express')
const session = require("express-session")

const app = express()
const port = 8080

app.use(session({
    secret: "secretCoder",
    resave: true,//el usuario permanece logueado
    saveUninitialized: true//permite guardar session aunque no tenga informacion. Si esta en false no se guardara
}))

app.get("/root", (req, res) => {

    const nombre = req.query

    if (req.session.counter) {
        req.session.counter++
        res.send(`${nombre.nombre} visitaste ${req.session.counter} veces nuestra pagina!`)
    } else {
        req.session.counter = 1
        res.send("Te damos la bienvenida")
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send("Logout")
        else res.send("Error al intentar salir")
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))