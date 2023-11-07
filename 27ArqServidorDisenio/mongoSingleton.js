import mongoose from "mongoose"

export default class MongoSingleton {
    static #instance

    constructor() {
        mongoose.connect("mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true, useUnifiedTopology: true
        })
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Ya se encuentra conectado a la DB")
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log("Conectado")
        return this.#instance
    }
}