function peticion() {
    fetch('http://localhost:8080/prueba').then(result => result.json())
        .then(json => console.log(json))
}