const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createHash, isValidatePassword } = require("../../utils")
const passport = require("passport")
const jwt = require("jsonwebtoken")

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {

    try {
        /*let { first_name, last_name, email, age, password } = req.body

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send('Faltan datos.');
        }

        const mail = await User.findOne({ email })

        console.log(mail)

        if (mail) {
            return res.status(400).send({ error: "Ya hay una cuenta registrada con ese email" })
        }

        const hashedPassword = createHash(password)

        const user = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });*/

        //res.send({ status: "success", payload: user })
        return res.redirect('/login')
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error interno del servidor' })
    }
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" })

        const user = await User.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 });

        //console.log(user, password)

        if (!isValidatePassword(user.password, password)) {
            return res.status(401).send({ error: "Error en password" })
        };

        if (user) {
            /* req.session.user = user
            res.redirect('/profile') */

            let token = jwt.sign({ email, password }, "coderSecret", { expiresIn: "24h" })
            res.cookie("tokenUsuario", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).redirect('/profile')

        } else {
            return res.status(400).send({ error: "Usuario no encontrado" })
        }


    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/profile', (req, res) => {
    /* if (!req.session.user) {
        return res.redirect('/login');
    } */
    const { first_name, last_name, email, age, password } = req.session.user;

    res.render('profile', { first_name, last_name, email, age });
});

router.get("/failregister", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})

router.get("/faillogin", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})


module.exports = router;