const express = require("express")
const app = express()
const PORT = 8080
const Contenedor = require("../PreEntrega2/Contenedor")

const testContendor = async () => {
    const contenedor = new Contenedor("productos.txt")

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

    const productos = await contenedor.getAll()

    app.get("/productos", (req, res) => {
        res.send("Los productos son: ", productos)
    })
}

testContendor()

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))