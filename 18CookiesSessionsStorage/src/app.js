const express = require('express')
//const cookieParser = require("cookie-parser")
const session = require("express-session")


const app = express()
const port = 8080

/*//para usar el html:
app.use(express.urlencoded({ extended: true }))

//ejecuccion cookie parser 
app.use(cookieParser())

//ruta para la vista
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

//ruta para el post
app.post("/setCookie", (req, res) => {
    const { user } = req.body
    res.cookie("user", user, { maxAge: 50000 }).send("Cookie creada")
})

app.get("/getCookie", (req, res) => {
    const userCookie = req.cookies.user
    console.log("my cookie", userCookie)
    res.send("Cookie mostrada en consola")
})*/

/*app.get("/deleteCookie", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada")
})*/


//middleware de express-session
app.use(session({
    secret: "secretCoder",
    resave: true,//el usuario permanece logueado
    saveUninitialized: true//permite guardar session aunque no tenga informacion. Si esta en false no se guardara
}))

//endpoints
app.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Cantidad de visitas: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send("Mensaje de bienvenida")
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send("Logout")
        else res.send("Error al intentar salir")
    })
    req.session.user = username
    req.session.admin = true //le damos todos los privilegios a este usuario
    res.send("Acceso satisfactorio")//El res.send es lo que se plasma en la pantalla del browser cuando entro a este endpoint
})

app.get("/login", (req, res) => {
    const { username, password } = req.query
    if (username !== "Nahuel" || password !== "NahuelCoder") {
        return res.send("Nombre o contraseña invalido")
    }
})

function auth(req, res, next) {
    if (req.session?.user === "Andres" && req.session?.admin) {
        return next()
    }
    return res.status(401).send("Error de autenticacion")
}

app.get("/private", auth, (req, res) => {
    res.send("Eres el admin")
})



app.listen(port, () => console.log(`Example app listening on port ${port}`))