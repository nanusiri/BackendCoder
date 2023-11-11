import express from 'express'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import userRouter from "./routes/user.router.js"
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import config from "./config/config.js"
import compression from "express-compression"

const app = express();
const port = config.port

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: 'proyectoFinal',
    resave: false,
    saveUninitialized: true
})
)

app.use("/", cartRouter);
app.use("/", productRouter);
app.use("/", userRouter)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression({
    brotli: { enabled: true, zlib: {} }
}))


app.listen(port, () => console.log(`Example app is active`));
