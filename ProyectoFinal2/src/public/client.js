const socket = io()


/*document.getElementById("boton").addEventListener("click", (e) => {
    e.preventDefault
    const productInput = document.getElementById("productInput")
    const product = productInput.value

    socket.emit("newProduct", product)
})*/


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
        appendProduct(prod)
    });
})

socket.on("newProduct", (products) => {

    const productList = document.getElementById("productList")

    productList.insertAdjacentHTML("beforeend", `<p> Product: ${products}</p>`)
})