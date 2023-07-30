/*function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}

const quantity = 10000

const randomFrequency = {}

for (let i = 0; i < quantity; i++) {
    const randomNumber = getRandomArbitrary(1, 20)
    if (randomFrequency[randomNumber]) {
        randomFrequency[randomNumber]++
    } else {
        randomFrequency[randomNumber] = 1
    }
}

for (const randomNumber in randomFrequency) {
    console.log(`${randomNumber} : ${randomFrequency[randomNumber]} veces`)
}*/

/*const productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terráqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 }
]

//NOMBRE DE PRODUCTOS
const nombres = productos.map(producto => producto.nombre)
const nombresSeparadosPorComa = nombres.join(", ")
//console.log(nombresSeparadosPorComa)

//PRECIO TOTAL
const precios = []
productos.forEach(producto => {
    precios.push(producto.precio)
})
const sumaDePrecios = precios.reduce((acumulador, valorActual) => {
    return acumulador + valorActual
}, 0).toFixed(2)
//console.log(sumaDePrecios.toFixed(2))

//PRECIO PROMEDIO
const promedio = productos.reduce((acc, producto) => acc + producto.precio, 0) / productos.length
const promedioDosDec = promedio.toFixed(2)
//console.log(promedioDosDec)

//PRODUCTO MENOR PRECIO
const productoMenorPrecio = productos.reduce((productoMenorPrecio, productoActual) => {
    if (productoMenorPrecio < productoActual) {
        return productoActual
    } else {
        return productoMenorPrecio
    }
})
//console.log(productoMenorPrecio)


const resultados = {
    nombres,
    sumaDePrecios,
    promedioDosDec,
    productoMenorPrecio
}

console.log(resultados)*/

const moment = require("moment")

let fechaDeNacimiento = moment("2001-01-03", "YYYY-MM-DD")
let hoy = moment()

const years = hoy.diff(fechaDeNacimiento, "years")

const days = hoy.diff(fechaDeNacimiento, "days")

console.log(`Hoy es ${hoy.format('DD/MM/YYYY')}`);
console.log(`Nací el ${fechaDeNacimiento.format('DD/MM/YYYY')}`);
console.log(`Desde mi nacimiento han pasado ${years} años.`);
console.log(`Desde mi nacimiento han pasado ${days} días.`);

