import { Router } from "express"
import {
    obtenerProductos,
    obtenerXProducto,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productControllers.js"
import { adminAuth } from "../utils.js"

const router = Router()

router.get('/api/products', obtenerProductos)

router.get('/api/products/:pid', obtenerXProducto)

router.post('/api/products', adminAuth, nuevoProducto)

router.put('/api/products/:pid', adminAuth, actualizarProducto)

router.delete('/api/products/:pid', adminAuth, eliminarProducto)


export default router