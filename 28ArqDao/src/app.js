import express from "express"
import mongoose from "mongoose"
import contactsRouter from "./routes/contacts.router.js"
const app = express()
const port = 8080

mongoose.connect("mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})

app.use("/contacts", contactsRouter)