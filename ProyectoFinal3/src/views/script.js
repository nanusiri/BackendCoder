document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault()

    let token = window.location.pathname.split('/').pop()

    let actionUrl = '/restablecerContrasenia/' + token

    this.action = actionUrl

    this.submit()
})

document.getElementById('iniciarSesion').addEventListener('submit', function (event) {
    event.preventDefault()

    let actionUrl = '/login'

    this.action = actionUrl

    this.submit()
})

document.getElementById('cambiarRol').addEventListener('submit', function (event) {
    event.prevent
    Default()

    let actionUrl = '/api/admin/cambiarRol'

    this.action = actionUrl

    this.submit()
})