import { faker } from "@faker-js/faker"
import ProductDTO from "./dao/DTOs/product.dto.js"

export const generateProduct = () => {
    const newProduct = {
        titulo: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.number.int({ max: 10000 }),
        price: faker.commerce.price(),
        status: true,
        stock: faker.number.int({ max: 10000 }),
        category: faker.commerce.productAdjective()
    }
    let product = new ProductDTO(newProduct)
    return product
}

export const adminAuth = (req, res, next) => {
    const user = req.session.user
    if (user.role == "admin") {
        next()
    } else {
        res.status(404).json({ error: "No es admin" })
    }
}

export const userAuth = (req, res, next) => {
    const user = req.session.user
    if (user.role == "user") {
        next()
    } else {
        res.status(404).json({ error: "No es user" })
    }
}
