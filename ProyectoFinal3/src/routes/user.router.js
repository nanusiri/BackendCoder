import express from "express"
const router = express.Router()
import { register, login, cambiarContrasenia, contraseniaOlvidada, cambiarRol } from "../controllers/userControllers.js"
import { userAuth } from "../utils.js"

router.post("/register", register)

router.post("/login", login)
router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/enviarMail", contraseniaOlvidada)

router.post("/restablecerContrasenia/:token", cambiarContrasenia)

router.get("/restablecerContrasenia/:token", (req, res) => {
    res.render('recuperarContraseña')
})

router.get("/api/users/premium/:uid", cambiarRol)


export default router
