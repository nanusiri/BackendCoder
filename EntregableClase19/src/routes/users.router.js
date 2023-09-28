// sessions.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createHash, isValidatePassword } = require("../../utils")

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {

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

        res.send({ status: "success", payload: user })
        //res.redirect('/login')
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" })

        //console.log(req.body)

        const user = await User.findOne({ email, password });

        if (!isValidatePassword(user, password)) {
            return res.status(401).render("login", { error: "Error en password" })
        };

        if (user) {
            req.session.user = user // Almacena el usuario en la sesión
            res.redirect('/profile') // Redirige al perfil si las credenciales son correctas
        } else {
            return res.status(400).render("login", { error: "Usuario no encontrado" })
        }
        if (!user) return res.status(400).render("login", { error: "Usuario no encontrado" })

        /* if (user) {
            req.session.user = user // Almacena el usuario en la sesión
            res.redirect('/profile') // Redirige al perfil si las credenciales son correctas
        } else {
            res.status(401).send('Credenciales inválidas'); // Credenciales incorrectas
        } */
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

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