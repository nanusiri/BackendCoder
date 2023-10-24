import express from 'express'
const router = express.Router()
import * as productController from '../controllers/productControllers.js';

router.get('/api/products', productController.obtenerProductos)

router.get('/api/products/:pid', productController.obtenerXProducto)

router.post('/api/products', productController.nuevoProducto)

router.put('/api/products/:pid', productController.actualizarProducto)

router.delete('/api/products/:pid', productController.eliminarProducto)


export default router