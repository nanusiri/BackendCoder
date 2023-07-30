const fs = require('fs').promises

class Contenedor {
    constructor(nomberArchivo) {
        this.nomberArchivo = nomberArchivo
        this.init()
    }

    async init() {
        try {
            await fs.access(this.nombreArchivo)
        } catch (error) {
            await this.deleteAll();
        }
    }

    async save(product) {
        try {
            const products = await this.getAll()
            const newId = products.length + 1
            product.id = newId
            products.push(product)

            await fs.writeFile(this.nomberArchivo, JSON.stringify(products, null, 2))
            return newId
        } catch (error) {
            throw new Error('Error al guardar el producto: ' + error.message)
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll()
            return products.find((product) => product.id === id) || null
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + error.message)
        }
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.nomberArchivo, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            throw new Error('Error al obtener todos los productos: ' + error.message)
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll()
            const filteredProducts = products.filter((product) => product.id !== id)

            await fs.writeFile(this.nomberArchivo, JSON.stringify(filteredProducts, null, 2))
        } catch (error) {
            throw new Error('Error al eliminar el producto por ID: ' + error.message)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.nomberArchivo, '[]')
        } catch (error) {
            throw new Error('Error al eliminar todos los productos: ' + error.message)
        }
    }
}

module.exports = Contenedor
