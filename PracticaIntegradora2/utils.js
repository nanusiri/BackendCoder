const bcrypt = require("bcrypt")

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidatePassword = (passwordHash, password) => bcrypt.compare(passwordHash, password)

module.exports = {
    createHash,
    isValidatePassword
}