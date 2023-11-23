import userModel from "../dao/models/user.model.js"
import User from "../dao/classes/user.dao.js"

const userService = new User()

export const register = async (req, res) => {
    const { first_name, last_name, email, age, password, role, phone } = req.body

    let result = await userService.registrarUsuario(first_name, last_name, email, age, password, role, phone)

    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}

export const login = async (req, res) => {
    const { email, password } = req.body;


    let result = await userService.loguearUsuario(email, password)

    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })

    req.session.user = result
    res.send({ status: "success", result: result })
}

export const cambiarContrasenia = async (req, res) => {
    const { email, newPassword, newPasswordCopy } = req.body;
    const { token } = req.params

    let result = await userService.restablecerContrasenia(email, newPassword, newPasswordCopy, token)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", result: result })
}

export const contraseniaOlvidada = async (req, res) => {
    const { email } = req.body;

    let result = await userService.enviarMail(email)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", message: "Mail enviado correctamente" })
}

export const cambiarRol = async (req, res) => {
    const uid = req.params.uid

    let result = await userService.nuevoRol(uid)
    if (!result) return res.status(500).send({ status: "error", error: "Algo salió mal" })
    res.send({ status: "success", payload: result })
}