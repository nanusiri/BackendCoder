const express = require("express")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const twilio = require("twilio")
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const TWILIO_ACCOUNT_SID = "AC707d219ce2c5dd26ba5badaef23ce3df"
const TWILIO_AUTH_TOKEN = "3c8ba847f7e1b55987da05149f52aca8"
const TWILIO_SMS_NUMBER = "+12052094852"

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nanualejandro@gmail.com",
        pass: "xkjh hlev pysq cvvz"
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/enviar-correo", (req, res) => {
    const { nombre, correo, mensaje } = req.body

    const mailOptions = {
        from: "nanualejandro@gmail.com",
        to: "drymeat.arg@gmail.com",
        subject: "Mail de prueba",
        text: `Nombre ${nombre}, correo: ${correo}, mensaje: ${mensaje}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send("Error de envio")
        } else {
            console.log("correo enviado", info.response)
            res.send("Correo enviado con exito")
        }
    })
})

app.get("/sms", async (req, res) => {
    let result = await client.messages.create({
        body: "prueba de sms",
        from: TWILIO_SMS_NUMBER,
        to: "+543814771513"
    })
})

app.listen(port, () => {
    console.log(`Server is runnign on port ${port}`)
})