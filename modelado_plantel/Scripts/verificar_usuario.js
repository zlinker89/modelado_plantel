$(document).ready(function () {
    // esta funcion redireciona al index si no hay sesion
    if (localStorage.getItem('usuario') !== null) {
        var datos = JSON.parse(localStorage.getItem('usuario'));
        $('.usuario').html(datos.nombres + " " + datos.apellidos);
    } else if (localStorage.getItem('usuario2') !== null) {
        var datos = JSON.parse(localStorage.getItem('usuario2'));
        $('.usuario').html(datos.nombres + " " + datos.apellidos);
    } else {
        location.href = "index.html";
    }
});