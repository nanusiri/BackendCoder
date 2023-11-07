let users = []

module.exports = {
    getAlllUsers: () => users,
    createUser: (newUser) => {
        users.push(newUser)
    }
}