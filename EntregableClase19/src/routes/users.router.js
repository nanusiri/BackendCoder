// sessions.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createHash, isValidatePassword } = require("../../utils")
const passport = require("passport")

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {

    try {
        let { first_name, last_name, email, age, password } = req.body

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send('Faltan datos.');
        }

        const hashedPassword = createHash(password)

        const user = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });

        //res.send({ status: "success", payload: user })
        res.redirect('/login')
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }
});

router.get("/failregister", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})

router.get("/faillogin", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" })

        const user = await User.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 });

        if (!isValidatePassword(user, password)) {
            return res.status(401).render("login", { error: "Error en password" })
        };

        console.log(user)

        delete user.password

        if (user) {
            req.session.user = user // Almacena el usuario en la sesión
            res.redirect('/profile') // Redirige al perfil si las credenciales son correctas
        } else {
            return res.status(400).render("login", { error: "Usuario no encontrado" })
        }
        if (!user) return res.status(400).render("login", { error: "Usuario no encontrado" })

    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user
    res.redirect("/profile")
})

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { first_name, last_name, email, age, password } = req.session.user;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        return res.render('adminProfile', { first_name, last_name, email, age })
    }

    res.render('profile', { first_name, last_name, email, age });
});


router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) return res.redirect('/login')
        else return res.send({ status: 'Logout ERROR', body: err })
    })
})

module.exports = router;