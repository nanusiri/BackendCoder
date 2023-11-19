import express from "express"
const router = express.Router()
import { register, login, cambiarContrasenia, contraseniaOlvidada } from "../controllers/userControllers.js"
import userModel from "../dao/models/user.model.js"

router.post("/register", register)

router.post("/login", login)

router.get("/enviarMail", contraseniaOlvidada)

router.post("/restablecerContrasenia/:token", cambiarContrasenia)

router.get("/restablecerContrasenia/:token", async (req, res) => {
    /* const { token } = req.params;

    const user = await userModel.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })

    if (!user) {
        return res.status(400).json({ message: 'Enlace inválido o expirado' });
    } */

    res.render('recuperarContraseña')
})


export default router
