import { Router } from "express"
import {
    obtenerProductos,
    obtenerXProducto,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productControllers.js"

const router = Router()

router.get('/api/products', obtenerProductos)

router.get('/api/products/:pid', obtenerXProducto)

router.post('/api/products', nuevoProducto)

router.put('/api/products/:pid', actualizarProducto)

router.delete('/api/products/:pid', eliminarProducto)


export default router