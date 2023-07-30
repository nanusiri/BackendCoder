function mostrarLetras(string, fin){
    const caracteres = string.split('')
    let index = 0

    const intervalId = setInterval(() => {
        if (index < caracteres.length){
            console.log(caracteres[index])
            index++
        } else {
            clearInterval(intervalId)
            fin()
        }
    }, 1000)
}

const fin = () => console.log("termine")


setTimeout(() => {
    mostrarLetras("Hola!", fin)
}, 1000);

/*mostrarLetras("Hola!", fin)
mostrarLetras("Hola!", fin)*/
