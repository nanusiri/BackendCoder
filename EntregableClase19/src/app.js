const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const usersRouter = require('./routes/users.router');
//const viewsRouter = require('./routes/views');
const User = require('./models/User');
const passport = require("passport")
const initializePassport = require("./config/passport.config")

const app = express();

mongoose.connect('mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600,
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
})
);

initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set("view engine", "handlebars")


app.use('/', usersRouter);

/* app.get('/', (req, res) => {
    res.send('Express Sessions!')
}) */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
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


app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { first_name, last_name, email, age, password } = req.session.user;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        return res.render('adminProfile', { first_name, last_name, email, age })
    }

    res.render('profile', { first_name, last_name, email, age });
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
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

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) return res.redirect('/login')
        else return res.send({ status: 'Logout ERROR', body: err })
    })
})*/

app.listen(8080, () => {
    console.log('Servidor en ejecución en el puerto 8080');
});


