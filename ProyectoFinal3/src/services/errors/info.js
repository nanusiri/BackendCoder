export const buscarPorIdErrorInfo = (pid) => {
    return `El pid: ${pid}, no coincide con ningun producto en nuestra base de datos`
}

export const nuevoProductoErrorInfo = (newProduct) => {
    return `El productCode: ${newProduct.productCode}, ya existe en nuestra base de datos`
}

export const noAuth = (user) => {
    return `El usuario ${user.first_name} no tiene la credencial necesaria para realizar esta actividad`
}