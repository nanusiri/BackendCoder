const Contenedor = require("./Contenedor")

const testContenedor = async () => {
    const contenedor = new Contenedor("productos.txt")

    const producto1 = {
        title: 'Producto 1',
        price: 100,
        thumbnail: 'url1',
    }
    const idProducto1 = await contenedor.save(producto1)
    console.log("El ID del producto 1 es: ", idProducto1)

    const producto2 = {
        title: 'Producto 2',
        price: 200,
        thumbnail: 'url2',
    }
    const idProducto2 = await contenedor.save(producto2)
    console.log("El ID del producto 2 es: ", idProducto2)

    const producto3 = {
        title: 'Producto 3',
        price: 300,
        thumbnail: 'url3',
    }
    const idProducto3 = await contenedor.save(producto3)
    console.log("El ID del producto 3 es: ", idProducto3)


    const productoById = await contenedor.getById(idProducto3)
    console.log(`El producto con ID ${idProducto3} es: `, productoById)

    const productos = await contenedor.getAll()
    console.log("Todos los productos: ", productos)

    await contenedor.deleteById(idProducto2)
    console.log("Producto eliminado")

    await contenedor.deleteAll()
    console.log("Todos los productos fueron eliminados")
}

testContenedor()

