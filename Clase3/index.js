//arrow function

/*const saludar = () => {
    console.log("saludos desde arrow function")
}

saludar()

const duplicar = (num) => num * 2
console.log(duplicar(8))*/

//arrow function en un array de objetos

/*const usuarios = [
    {nombre: "user1", edad: 20},
    {nombre: "user2", edad: 25},
    {nombre: "user3", edad: 27}
]

const nombres = usuarios.map(usuario => usuario.nombre)

console.log(nombres)*/

//LOS CALLBACK SON FUNCIONES QUE LE PASO COMO PARAMETRO A UNA FUNCION =>

function obtenerDatosDelUsuario(id, callback) {
    setTimeout(()=>{
        const usuario = {
            id: id,
            nombre: "Nahuel",
            email: "nanualejandro@gmail.com"
        }
        callback(usuario)
    }, 3000)
}

function mostrarDatosDelUsuario(usuario) {
    console.log(`Nombre: ${usuario.nombre}, Email: ${usuario.email}`)
}

obtenerDatosDelUsuario(456, mostrarDatosDelUsuario)