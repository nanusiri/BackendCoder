class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos son obligatorios.")
            return
        }

        const codeExists = this.products.some(product => product.code === code)
        if(codeExists){
            console.log("Ya existe un producto con el mismo code")
            return
        }

        const product = {
            id: this.products.length +1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(product)
    }

    

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const productId = Number(id)
        const product = this.products.find(product => product.id === productId)
        if(product){
            return product
        } else {
            console.log("Error: Producto no encontrado")
            return null
        }
    }
}

const productManager = new ProductManager

productManager.addProduct("Avena", "Avena tradicional 500g", 500, "https://www.elmueble.com/medio/2019/08/25/copos-de-avena_d397fa3d_1200x630.jpg", "AVN00", 50)
productManager.addProduct("Salsa", "Salsa pomarola 250g", 250, "https://www.google.com/search?rlz=1C1CHZN_esAR1029AR1029&sxsrf=AB5stBiHzdyPHuY-2EzmTxI8noDH145X3g:1689555491907&q=salsa+pomarola&tbm=isch&sa=X&ved=2ahUKEwixj7HXxJSAAxUhqJUCHWAACYgQ0pQJegQIDBAB&biw=1920&bih=929&dpr=1#imgrc=OtsvCMC3z0MbJM", "SLS01", 20)
productManager.addProduct("Fideos", "Fideos codito 500g", 400, "https://ardiaprod.vtexassets.com/arquivos/ids/226424/Fideos-Coditos-Lucchetti-500-Gr-_1.jpg?v=637904606290770000", "FDO02", 40)

productManager.getProducts()
console.log(productManager.getProductById(3))