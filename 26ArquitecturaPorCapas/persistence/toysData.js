let toys = []

module.exports = {
    getAlllToys: () => toys,
    createToy: (newToy) => {
        toys.push(newToy)
    }
}