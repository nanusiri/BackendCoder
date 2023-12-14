document.getElementById('iniciarSesion').addEventListener('submit', function (event) {
    event.preventDefault()

    let token = window.location.pathname.split('/').pop()

    let actionUrl = '/login'

    this.action = actionUrl

    this.submit()
})