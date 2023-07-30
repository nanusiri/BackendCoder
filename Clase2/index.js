/*//OPERADOR EXPONENCIAL ECMAScript 6
let resultado = 2**4
console.log(resultado)//result 16

let resultado2 = 2**3**2
console.log(resultado2)//result 512 da 512 por que lo realiza de derecha a izquiera: 3**2 = 9 y 2**9 = 512

//ARRAY.INCLUDES (TRUE O FALSE) ECMAScript 7
const numbers = [1,2,3,4,5,6]
console.log(numbers.includes(2))//true
console.log(numbers.includes(8))//false

//OPERADOR NULLISH
const nombre = null
const nombrePorDefecto = "Nahuel"
const nombreCompleto = nombre ?? nombrePorDefecto
console.log(nombreCompleto)//Si hay un null en nombre se me romperia la app, por eso agrego el nullish lo cual si me da null le agrega un valor por defecto

const cantidad = null
const cantidadPorDefecto = "Nahuel"
const cantidadFinal = cantidad ?? cantidadPorDefecto
console.log(cantidadFinal)//Da 0

//OBJECT.ENTRIES - OBJECT.KEYS - OBJECT.VALUES ECMAScript 8
const estudiantes = {
    nombre: "Nahuel",
    edad: 22,
    ciudad: "Yerba Buena"
}
const valores = Object.values(estudiantes)//Me mustra los datos ingresados en el objeto (Nahuel, 22, YB)
const valores2 = Object.keys(estudiantes)//Me muestra el tipo de dato a ingresar (nombre, edad, ciudad)
const valores3 = Object.entries(estudiantes)//Me muestra cada tipo de dato con el dato ingresado ([nombre, nahuel],[edad, 20],[ciudad, YB]])

console.log(valores)
console.log(valores2)
console.log(valores3)

//FINALLY() ECMAScript 9
function ejemploPromesa(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true

            if (exito) {
                resolve("Exito")
            } else {
                reject("Error")
            }
        }, 3000)
    })
}

ejemploPromesa()
.then((resultado) => {
    console.log(resultado)//Se ejecuta en caso de positivo
}).catch((error) => {
    console.log(error) //Se ejecuta en caso de negativo
}).finally(() => {
    console.log("Promesa finalizada")//Se ejecuta si o si
})

//SPREAD OPERATOR ...
let numeros = [1,2,3,4,5]
let nuevosNumeros = [...numeros, 6,7]
console.log(nuevosNumeros)

//REST OPERATOR
function imprimirDatos(usuario, ...datosExtra){//Aca tengo los ... para que luego cuando llame a la funcion pueda agregarle los datos
    console.log(`Nombre: ${usuario.nombre}`)
    console.log(`Edad: ${usuario.edad}`)
    console.log("Otros datos: " + datosExtra.join(", "))//El .join nos agrega lo que le pongamos entre parentesis como divisor de dos elementos, sirve para anexo 
}

const persona = {
    nombre: "Nahuel",
    edad: 22
}

imprimirDatos(persona, "Altura: 180cm", "Peso: 85.25kg") 

//TRABAJO PARA REALIZAR DURANTE LA CLASE

const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]

const tiposDeProductos = []

objetos.forEach(objeto => {
    Object.keys(objeto).forEach(producto => {
        if(!tiposDeProductos.includes(producto)){
            tiposDeProductos.push(producto)
        }
    })
});

console.log(tiposDeProductos)

let productosVendidos = 0

objetos.forEach(objeto => {
    Object.values(objeto).forEach(numero => {
        productosVendidos += numero
    })
})

console.log(productosVendidos)*/

//ECMAScript 10
//.trim()
let cadena = "Nahuel      Sirimarco     "
console.log(cadena)
const sinEspacios = cadena.trim()//Le saca los epsacios

console.log(sinEspacios)

//.flat()

const matriz = [1,2,[3,4],[5,6]]
const matrizPlana = matriz.flat()//sirve para poner todos los elementos en un solo array
console.log(matrizPlana)