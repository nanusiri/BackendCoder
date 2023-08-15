const socket = io()

const boton = document.getElementById("boton")
boton.addEventListener("click", sendMessage())

//Funcion para enviar los mensajes al servidor
function sendMessage() {
    const message = document.getElementById("messageInput").value
    socket.emit("newMessage", message)
}

//Funcion para mostrar los mensajes en pantalla
function appendMessage(socketId, message) {
    const messageList = document.getElementById("messageList")
    const newMessage = document.createElement("p")
    newMessage.textContent = `${socket.id}: ${message}`
    messageList.appendChild(newMessage)
}

socket.on("messageList", (messages) => {
    const messageList = document.getElementById("messageList")
    messageList.innerHTML = ""
    messages.forEach((msg) => {
        appendMessage(msg.socketId, msg.mensaje)
    });
})

socket.on("newMessage", (data) => {
    appendMessage(data.socketID, data.mensaje)
})