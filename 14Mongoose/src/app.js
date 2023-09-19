const express = require('express')
const mongoose = require('mongoose')
const userRouter = require("./routes/users.router")
const { userModel } = require('./models/user.model')
const { studentModel } = require('./models/student.model')
const { courseModel } = require('./models/course.model')
const { orderModel } = require('./models/order.model')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())

/*mongoose.connect('mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
     console.log("Conectado a la BD de Mongo Atlas")
})
.catch(error => {
    console.error("Error en la conexion", error);
})*/


const enviroment = async () => {
    await mongoose.connect('mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority')

    /*let response = await userModel.find({ first_name: "Dolorita" }).explain("executionStats")
    console.log(response)*/

    /*await studentModel.create({
        first_name: "Franco",
        last_name: "Garay",
        email: "franco@garay.com",
        gender: "Male"
    })*/

    /*await courseModel.create({
        title: "Curso de backend",
        description: "El ultimo de full stack",
        difficulty: 7,
        topics: ["fs", "express", "hbs", "websockets", "mongoDB"],
        professor: "El tio Omar"
    })*/

    /*let student = await studentModel.findById({ _id: "64f79eb53e12aa958ed30f3b" })

    student.courses.push({ course: "64f7a2be92014445c6717292" })

    let result = await studentModel.updateOne({ _id: "64f79eb53e12aa958ed30f3b" }, student)
    console.log(JSON.stringify(student, null, '\t'))*/

    console.log("Conectado a la base de datos")

    /*let result = await orderModel.insertMany(
        [
            { name: "Muzarella", size: "medium", price: 1000, quantity: 20, date: "2023-09-01" },
            { name: "Especial", size: "large", price: 1500, quantity: 10, date: "2023-09-02" },
            { name: "Argentina", size: "small", price: 1800, quantity: 30, date: "2023-09-03" },
            { name: "4 quesos", size: "medium", price: 2000, quantity: 50, date: "2023-09-04" },
            { name: "Primavera", size: "small", price: 800, quantity: 10, date: "2023-09-04" }
        ]
    )
    console.log(result)*/

    /*let orders = await orderModel.aggregate([
        { $match: { size: "medium" } },
        { $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } } },
        { $sort: { totalQuantity: -1 } },
        { $group: { _id: 1, orders: { $push: "$$ROOT" } } },
        {
            $project: {
                "_id": 0,
                orders: "$orders"
            }
        },
        {
            $merge: {
                into: "reports"
            }
        }
    ])
    console.log(orders)*/

}

enviroment()


app.use("/api/users", userRouter)