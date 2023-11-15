import { Router } from "express"
import {
    crearCarrito,
    obtenerCarrito,
    agregarProducto,
    actualizarCarrito,
    actualizarCantidad,
    eliminarProducto,
    eliminarCarrito,
    finalizarCompra
} from "../controllers/cartControllers.js"
import { userAuth } from "../utils.js"
import { logger } from "../services/logger.js"


const router = Router()

router.post("/api/carts", userAuth, crearCarrito)

router.get('/api/carts/:cid', obtenerCarrito)

router.post('/api/carts/:cid/product/:pid', userAuth, agregarProducto)

router.put('/api/carts/:cid', actualizarCarrito)

router.put('/api/carts/:cid/products/:pid', actualizarCantidad)

router.delete('/api/carts/:cid/products/:pid', eliminarProducto)

router.delete('/api/carts/:cid', eliminarCarrito)

router.post("/api/carts/:cid/purchase", finalizarCompra)

export default router;