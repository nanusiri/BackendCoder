import { faker } from "@faker-js/faker"

/* faker.locale = "es" */

export const generateUser = () => {
    let numOfProducts = parseInt(faker.string.numeric(1, { bannedDigits: ['0'] }))

    let products = []

    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())
    }
    console.log(products)
    return {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        email: faker.internet.email()
    }
}

export const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.productDescription()//DENTRO DE LA PAGINA DE FAKER TENGO TODAS LAS OTRAS OPCIONES QUE ME PUEDA GENERAR
    }
}

export default generateUser