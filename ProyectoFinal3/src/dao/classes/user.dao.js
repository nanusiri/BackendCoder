import userModel from "../models/user.model.js"
import CustomError from "../../services/errors/CustomError.js"
import { buscarUsuarioErrorInfo, newPasswordCopyErrorInfo, newPasswordErrorInfo } from "../../services/errors/info.js"
import EErrors from "../../services/errors/enums.js"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const JWT_SECRET = 'tu_secreto_super_seguro'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nanualejandro@gmail.com",
        pass: "xkjh hlev pysq cvvz"
    }
})

export default class User {
    registrarUsuario = async (first_name, last_name, email, age, password, role, phone) => {
        try {
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password,
                role,
                phone
            }

            let result = await userModel.create(newUser)
            return result
        } catch (error) {
            console.error(error);
            return null
        }
    }

    loguearUsuario = async (email, password) => {
        try {
            const user = await userModel.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1, role: 1, phone: 1 })

            if (user.password === password) {
                return user;
            } else {
                return null
            }


        } catch (error) {
            console.error(error);
            return null
        }
    }

    restablecerContrasenia = async (email, newPassword, newPasswordCopy, token) => {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET)
            console.log('Token decodificado:', decodedToken)
            const user = await userModel.findOne({ email: decodedToken.email, resetToken: token });
            console.log('Usuario encontrado:', user)


            if (!user) {
                return CustomError.createError({
                    name: "Usuario no encontrado en la DB",
                    cause: buscarUsuarioErrorInfo(email),
                    message: "No hubo coincidencias",
                    code: EErrors.INVALID_PARAMS
                })
            }

            if (newPassword === user.password) {
                return CustomError.createError({
                    name: "No puede colocar la misma contraseña que tenia antes",
                    cause: newPasswordErrorInfo(),
                    message: "Intento cambiar su contraseña por la que tiene actualmente activa",
                    code: EErrors.INVALID_PARAMS
                })
            }

            if (newPassword != newPasswordCopy) {
                return CustomError.createError({
                    name: "Las contraseñas no son iguales",
                    cause: newPasswordCopyErrorInfo(),
                    message: "Las dos contraseñas que ingreso deben ser iguales",
                    code: EErrors.INVALID_PARAMS
                })
            }

            user.password = newPassword
            user.resetToken = undefined
            user.save()
            return user

        } catch (error) {
            console.error(error);
            return null
        }
    }

    enviarMail = async (email) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return CustomError.createError({
                    name: "Usuario no encontrado en la DB",
                    cause: buscarUsuarioErrorInfo(email),
                    message: "No hubo coincidencias",
                    code: EErrors.INVALID_PARAMS
                })
            }

            const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' })
            console.log('Token generado', resetToken)
            user.resetToken = resetToken
            await user.save()

            const resetLink = `http://localhost:8080/restablecerContrasenia/${resetToken}`

            const mailOptions = {
                from: "nanualejandro@gmail.com",
                to: email,
                subject: "Solicitud de cambio de contraseña",
                html: `
                <div>
                    <h1>Hola ${user.first_name}</h1>
                    <p>Usted ha solicitado un cambio de contraseña, para realizarlo haga click en el siguiente link:</p>
                    <a href="${resetLink}" target="_blank">${resetLink}</a>
                </div>
                `
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("correo enviado", info.response)
                }
            })

            return user
        } catch (error) {
            console.error(error);
            return null
        }
    }

    nuevoRol = async (uid) => {
        try {
            const user = await userModel.findById({ _id: uid })

            if (!user) {
                return CustomError.createError({
                    name: "Usuario no encontrado en la DB",
                    cause: buscarUsuarioErrorInfo(uid),
                    message: "No hubo coincidencias",
                    code: EErrors.INVALID_PARAMS
                })
            }

            if (user.role == "user") {
                user.role = "premium"
                await user.save()
                return user
            } else {
                user.role = "user"
                await user.save()
                return user
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }
}