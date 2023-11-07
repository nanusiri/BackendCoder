// sessions.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createHash, isValidatePassword } = require('../../utils');
const passport = require("passport")

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', passport.authenticate("register", { failureRedirect: "/failuregister" }), async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    const hashedPassword = createHash(password);

    let user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
    });

    /* res.send({ status: "success", payload: user });
    console.log('Usuario registrado con éxito.' + user); */
    res.redirect('/login');
});

router.get("/failuregister", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})

router.get("/faillogin", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})


router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { first_name, last_name, email, age } = req.session.user;
    console.log(first_name, last_name, email, age)
    res.render('profile', { first_name, last_name, email, age });
    console.log('Usuario logueado con éxito.');
});

router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login', passport.authenticate('login', { failureRedirect: '/failuregister' }), async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).send({ status: "error", error: "valores incorrectos" })
    const user = User.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password })//Esto busca si en la base de datos hay un user con esta informacion
    if (!user) return res.status(400).send({ status: "error", error: "usuario no encontrado" })
    if (!isValidatePassword(user, password)) return res.status(403).send({ status: "error", error: "Password incorrtecta" })

    delete user.password

    req.session.user = user

    res.send({ status: "succes", payload: user })
});

/* router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {

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
}); */

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { first_name, last_name, email, age } = req.session.user;
    res.render('profile', { first_name, last_name, email, age });
});


module.exports = router;