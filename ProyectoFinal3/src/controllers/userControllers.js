import User from "../dao/models/user.model.js"

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role, phone } = req.body

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password,
            role,
            phone
        }
        console.log(newUser)
        let result = await User.create(newUser)
        return res.send({ status: "Success", payload: result })
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1, role: 1, phone: 1 })
        //console.log(user)
        if (user.password === password) {
            req.session.user = user
            return res.send({ status: "Success", payload: user });
        } else {
            return res.status(400).render("login", { error: "Usuario no encontrado" })
        }

    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }
}
