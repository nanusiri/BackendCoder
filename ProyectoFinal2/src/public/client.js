const socket = io()

const boton = document.getElementById("boton")
boton.addEventListener("click", sendProduct())

function sendProduct() {
    const product = document.getElementById("productInput").value
    socket.emit("newProduct", product)
}

function appendProduct(product) {
    const productList = document.getElementById("productList")
    const newProduct = document.createElement("p")
    newProduct.textContent = `Producto: ${product}`
    productList.appendChild(newProduct)
}

socket.on("productList", (products) => {
    const productList = document.getElementById("productList")
    productList.innerHTML = ""
    products.forEach((prod) => {
        appendProduct(prod.producto)
    });
})
