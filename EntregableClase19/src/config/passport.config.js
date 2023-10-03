const passport = require("passport")
const local = require("passport-local")
const userService = require("../models/User")
const { createHash, isValidatePassword } = require("../../utils")
const GitHubStrategy = require("passport-github2")

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register", new localStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let user = await userService.findOne({ email: username })
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
                let result = await userService.create(newUser)
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
        let user = await userService.findById(id);
        done(null, user);
    });

    passport.use(
        "login",
        new localStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userService.findOne({ email: username });
                //console.log(user)
                if (!user) {
                    console.log("Usuario no existe")
                    return done(null, false);
                }

                if (!isValidatePassword(password, user)) { // Make sure isValidatePassword is defined
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.aca5a7490dfa95aa",
        clientSecret: "7c0265a7d4742063fccba6901c38d2f666e6eb99",
        callbackURL: "http://localhost:8080/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                }
                let result = await userService.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
    ))
}

module.exports = initializePassport