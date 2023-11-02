/* import passport from "passport";
import local from "passport-local"
import userModel from "../dao/models/user.model.js";
import { createHash, isValidatePassword } from "../utils.js"

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register", new localStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let user = await userModel.findOne({ email: username })
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                if (!first_name || !last_name || !email || !age || !password) {
                    // Check if all required fields are present in the request body
                    console.log("Faltan campos obligatorios");
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport */