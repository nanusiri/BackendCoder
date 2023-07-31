const express = require("express")
const app = express()
const PORT = 8080
const Contenedor = require("../PreEntrega2/Contenedor")

const contenedor = new Contenedor("productos.txt")

app.get("/productos", async (req, res) => {
    try {
        const productos = await contenedor.getAll()
        res.json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" })
    }
})

app.get("/productoRandom", async (req, res) => {
    try {
        const productos = await contenedor.getAll()
        if (productos.length === 0) {
            res.status(404).json({ error: "No hay productos disponibles" })
        } else {
            const randomIndex = Math.floor(Math.random() * productos.length)
            const randomProduct = productos[randomIndex]
            res.json(randomProduct)
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener un producto aleatorio" })
    }
})

const initializeData = async () => {
    const producto1 = {
        title: 'Producto 1',
        price: 100,
        thumbnail: 'url1',
    }
    await contenedor.save(producto1)

    const producto2 = {
        title: 'Producto 2',
        price: 200,
        thumbnail: 'url2',
    }
    await contenedor.save(producto2)

    const producto3 = {
        title: 'Producto 3',
        price: 300,
        thumbnail: 'url3',
    }
    await contenedor.save(producto3)
}

initializeData().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Escuchando en el puerto ${PORT}`)
    })

    server.on("error", error => console.log(`Error en servidor ${error}`))
})

