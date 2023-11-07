/* process.on("exit", (code) => {
    console.log("Listener " + code)
})

console.log("Iniciando un proceso")


setTimeout(() => {
    console.log("Terminando el proceso")
    process.exit(0)
}, 5000) */

process.on("uncaughtException", (error) => {
    console.error("Excepcion no controlada")
    console.error(error.stack)
    process.exit(1)
})

throw new Error("Excepcion no controlada")