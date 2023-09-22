const express = require('express');
const path = require('path')
const session = require("express-session")
const handlebars = require("express-handlebars")
const sessionRouter = require("./routes/sessions")
const viewsRouter = require("./routes/views")
const MongoStore = require("connect-mongo")

const port = 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'views')))

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: true
}))

/* app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "views")
app.set("view engine", "handlebars") */


app.use("/api/sessions", sessionRouter)
app.use("", viewsRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.get('/api/sessions/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'register.html'))
})

app.get('/api/sessions/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'login.html'))
})

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'profile.html'))
})