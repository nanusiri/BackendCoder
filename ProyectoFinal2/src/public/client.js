const socket = io()

const boton = document.getElementById("boton")
boton.addEventListener("click", sendProduct())