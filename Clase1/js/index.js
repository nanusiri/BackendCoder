/*let comidas = ["huevo", "avena", "leche"]
let comidas0  = []

function mostrarLista(lista) {
   if(lista.length > 0){
        console.log(lista)
   } else {
    console.log("Lista vacia")
   }
}

mostrarLista(comidas)
mostrarLista(comidas0)

console.log(comidas)*/

/*(function(lista) {
    if (lista.length > 0) {
        lista.forEach(element => console.log(element));
    } else {
        console.log("lista vacia")
    }
})([1, 2, 3])*/

/*function crearMultiplicador(a) {
    return function(b){
        return a*b
    }
}

const duplicar = crearMultiplicador(2)
const triplicar = crearMultiplicador(3)

console.log(duplicar(5))
console.log(triplicar(7))*/

class Persona {
    constructor(edad, nombre){
        this.edad = edad
        this.nombre = nombre
    }
    saludar(){
        console.log(`Hola me llamo ${this.nombre}, voy a cumplir ${this.edad}`)
    }
}
const persona1 = new Persona(23, "Nahuel")
console.log(persona1)
persona1.saludar()

/*class Contador {
    static cuentaGlobal = 0

    constructor(responsable){
        this.responsable = responsable
        this.cuentaIndividual = 0
    }

    obtenerResponsable(){
        return this.responsable
    }

    obtenerCuentaIndividual(){
        return this.cuentaIndividual
    }

    static obtenerCuentaGlobal(){
        return Contador.cuentaGlobal
    }
    
    contar(){
        this.cuentaIndividual++
        Contador.cuentaGlobal++
    }
}

const contador1 = new Contador ("persona 1")
const contador2 = new Contador ("persona 2")*/


class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(bookName, bookAuthor){
        const libro = {
            nombre: bookName,
            autor: bookAuthor
        }
        this.libros.push(libro)
    }

    getBookNames(){
        console.log(this.libros.map(libro => libro.nombre))
    }
}

const usuario1 = new Usuario("Nahuel", "Sirimarco", [{nombre: "Piense y hagase rico", autor: "Napoleon Hill"}, {nombre: "Trabaje duro y con astucia", autor: "50 cent"}], ["Pez", "Gato"])

usuario1.getFullName()
usuario1.addMascota("Kida")
usuario1.countMascotas()
usuario1.addBook("PadreRico PadrePobre", "Robert Kiyosaki")
usuario1.getBookNames()
