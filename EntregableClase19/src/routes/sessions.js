// sessions.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    let user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password
    });

    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            req.session.user = user; // Almacena el usuario en la sesión
            res.redirect('/profile'); // Redirige al perfil si las credenciales son correctas
        } else {
            res.status(401).send('Credenciales inválidas'); // Credenciales incorrectas
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;