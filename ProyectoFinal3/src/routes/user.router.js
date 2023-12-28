import express from "express"
const router = express.Router()
import { register, login, cambiarContrasenia, contraseniaOlvidada, cambiarRol, logout, upload, uploadProfileImage, uploadProductImage, obtenerUsuarios, eliminarUsuarios, adminCambiaRol } from "../controllers/userControllers.js"
import { uploader } from "../utils.js"

router.post("/register", register)

router.post("/login", login)
router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/api/users/logout", logout)


router.get("/enviarMail", contraseniaOlvidada)

router.post("/restablecerContrasenia/:token", cambiarContrasenia)
router.get("/restablecerContrasenia/:token", (req, res) => {
    res.render('recuperarContraseña')
})

router.get("/api/users/premium/:uid", cambiarRol)

router.post("/api/users/:uid/documents", uploader.array('file'), upload)
router.post("/api/users/:uid/profileImage", uploader.single('profileImage'), uploadProfileImage)
router.post("/api/users/:uid/productImage/:pid", uploader.single('productImage'), uploadProductImage)

router.get("/api/users", obtenerUsuarios)
router.delete("/api/users", eliminarUsuarios)

//router.get()
router.post("/api/admin/cambiarRol", adminCambiaRol)
router.get("/api/admin/cambiarRol", (req, res) => {
    res.render('adminFunctions')
})



export default router
