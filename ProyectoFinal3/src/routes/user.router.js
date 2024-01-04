import express from "express"
const router = express.Router()
import { register, login, cambiarContrasenia, contraseniaOlvidada, cambiarRol, logout, upload, uploadProfileImage, uploadProductImage, obtenerUsuarios, eliminarUsuarios, adminView, adminDetailView, eliminarUsuario } from "../controllers/userControllers.js"
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
router.post("/api/admin", adminView)
router.get("/api/admin", (req, res) => {
    res.render('adminFunctions')
})
router.get("/api/admin/:uid", adminDetailView)
router.delete("/api/admin/:uid", eliminarUsuario)



export default router
