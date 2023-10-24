import express from 'express'
const router = express.Router()
import * as cartController from '../controllers/cartControllers.js';


router.post("/api/carts", cartController.crearCarrito)

router.get('/api/carts/:cid', cartController.obtenerCarrito)

router.post('/api/carts/:cid/product/:pid', cartController.agregarProducto)

router.put('/api/carts/:cid', cartController.actualizarCarrito)

router.put('/api/carts/:cid/products/:pid', cartController.actualizarCantidad)

router.delete('/api/carts/:cid/products/:pid', cartController.eliminarProducto)

router.delete('/api/carts/:cid', cartController.eliminarCarrito)

export default router;