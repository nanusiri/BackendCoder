import { Router } from "express"
import {
    crearCarrito,
    obtenerCarrito,
    agregarProducto,
    actualizarCarrito,
    actualizarCantidad,
    eliminarProducto,
    eliminarCarrito
} from "../controllers/cartControllers.js"

const router = Router()

router.post("/api/carts", crearCarrito)

router.get('/api/carts/:cid', obtenerCarrito)

router.post('/api/carts/:cid/product/:pid', agregarProducto)

router.put('/api/carts/:cid', actualizarCarrito)

router.put('/api/carts/:cid/products/:pid', actualizarCantidad)

router.delete('/api/carts/:cid/products/:pid', eliminarProducto)

router.delete('/api/carts/:cid', eliminarCarrito)

export default router;