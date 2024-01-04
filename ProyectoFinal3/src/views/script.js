//RESTABLECER CONTRASEÑA
document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault()

    let token = window.location.pathname.split('/').pop()

    let actionUrl = '/restablecerContrasenia/' + token

    this.action = actionUrl

    this.submit()
})

//INICIAR SESION
document.getElementById('iniciarSesion').addEventListener('submit', function (event) {
    event.preventDefault()

    let actionUrl = '/login'

    this.action = actionUrl

    this.submit()
})

//ENCONTRAR USUARIO
document.getElementById('buscarUsuario').addEventListener('submit', function (event) {
    event.preventDefault()

    let actionUrl = '/api/admin'

    this.action = actionUrl

    this.submit()
})

