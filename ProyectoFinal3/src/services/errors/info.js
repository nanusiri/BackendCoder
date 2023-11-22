export const buscarPorIdErrorInfo = (pid) => {
    return `El pid: ${pid}, no coincide con ningun producto en nuestra base de datos`
}

export const buscarPorEmailErrorInfo = (email) => {
    return `El email: ${email}, no coincide con ningun usuairo en nuestra base de datos`
}

export const nuevoProductoErrorInfo = (newProduct) => {
    return `El productCode: ${newProduct.productCode}, ya existe en nuestra base de datos`
}

export const noAuth = (user) => {
    return `El usuario ${user.first_name} no tiene la credencial necesaria para realizar esta actividad`
}

export const newPasswordErrorInfo = () => {
    return `El usuario intento cambiar su contraseña pero coloco la misma que antes`
}

export const newPasswordCopyErrorInfo = () => {
    return `Las dos contraseñas que ingreso el usuario no son iguales`
}

export const noAuthOwner = (product) => {
    return `El producto le pertenece a ${product.productOwner}, usted no lo puede eliminar`
}
