$(document).ready(inicio);

function inicio() {
    $('#progreso').hide();
    $('select').material_select();
    $('.verificar').click(casilla);
    verificarCasilla();
}


function casilla() {
    if ($('.verificar').is(':checked')) {
        localStorage.setItem('alcance', 'aplication');
    } else {
        localStorage.removeItem('alcance');
    }
}

function verificarCasilla() {
    if (localStorage.getItem('alcance') !== null) {
        if (localStorage.getItem('usuario') !== null) {
            var rol = localStorage.getItem('rol');
            switch (rol) {
                case "4":
                    location.href = "admin.html";
                    break;
            }
        }
    }
}