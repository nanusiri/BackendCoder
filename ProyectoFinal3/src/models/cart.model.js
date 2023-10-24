import mongoose from "mongoose"

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    titularCarrito: { type: String, required: true, max: 200, index: true },
    productos: {
        type: [
            {
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: { type: Number }
            }
        ],
        default: []
    }
})

cartSchema.pre("find", function () {
    this.populate("products.product")
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel 