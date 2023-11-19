import express from "express"
const router = express.Router()
import { register, login, cambiarContrasenia, contraseniaOlvidada } from "../controllers/userControllers.js"

router.post("/register", register)

router.post("/login", login)

router.get("/enviarMail", contraseniaOlvidada)

router.post("/restablecerContrasenia/:token", cambiarContrasenia)

router.get("/restablecerContrasenia/:token", (req, res) => {
    res.render("recuperarContraseña")
})


export default router
