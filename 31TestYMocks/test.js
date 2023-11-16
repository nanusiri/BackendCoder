let testPasados = 0
let testTotales = 3
const suma = (a, b) => {
    if (!a || !b) return 0
    if (typeof a !== "number" || typeof b !== "number") return null
    return a + b
}

console.log("Test1, si NO son valores numericos devuelve null")
let resultTest1 = suma("2", 2)

if (resultTest1 === null) {
    console.log("test1 pasado")
    testPasados++
} else console.log(`Test 1 no pasado, se recibio ${typeof resultTest1}, y se esperaba NULL`)
console.log("Test 2 La funcion debe devolver 0 si no se paso ningun parametro")

let resultTest2 = suma()
console.log(resultTest2)
if (resultTest2 !== 0) {
    console.log("test2 pasado")
    testPasados++
} else console.log("Test 2 no pasado")

console.log("TEST 3 La funcion debe devolver la suma correctamente")

let resultTest3 = suma(3, 5)
if (resultTest3 === 5) {
    console.log("TEST 3 pasado")
    testPasados++
} else console.log(`TEST 3 no pasado, se recibio ${resultTest3} pero se esperaba 5`)


if (testPasados === testTotales) { console.log("Todos los test fueron pasados") }
console.log(suma())