/* import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidatePassword = (passwordHash, password) => bcrypt.compare(passwordHash, password)

 */

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
