import dotenv from 'dotenv'

dotenv.config()

const enviroment = "PRODUCTION"

dotenv.config({
    path: enviroment === "DEVELOPMENT" ? './.env.development' : './.env.production'
})

export default {
    port: process.env.PORT,
    name: process.env.ADMIN_NAME
}