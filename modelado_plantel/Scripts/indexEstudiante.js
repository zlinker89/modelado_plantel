var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.detail = ko.observableArray();
    self.detail_modificar = ko.observable();
    self.detail_enlazar = ko.observable();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var estudiantesUri = '/api/Estudiantes/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            beforeSend: function () {
                $('#progreso').show();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('#progreso').hide();
            self.error(errorThrown);
            Materialize.toast(errorThrown, 5000);
        });
    }
    /*----------------------------------------- Functions para los roles ------------------1---*/

    function getAllUsuarios() {
        ajaxHelper(usuariosUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.usuarios(data);
        });
    }

    function getAllEstudiantes() {
        ajaxHelper(estudiantesUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.estudiantes(data);
        });
    }


    // aaaaaaaaaaaaaaaaaaa---------------------- Funciones para estudiantes
    self.addEstudiante = function () {
        var nombres = $('#nombres').val();
        var apellidos = $('#apellidos').val();
        var documento = $('#documento').val();
        var tdocumento = $('#tdocumento').val();
        var direccion = $('#direccion').val();
        var telefono = $('#telefono').val();
        var fecha_nacimiento = $('#fecha_nacimiento').val();
        var contrasena = $('#contrasena').val();
        var contrasena2 = $('#contrasena2').val();
        // obtengo la fecha de hoy
        var d = new Date();
        var fecha_registro = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        if (contrasena !== contrasena2) {
            Materialize.toast("Las contraseñas no son iguales.", 5000);
        } else {
            try {
                var usuario = {
                    nombreusuario: documento,
                    contrasena: contrasena,
                    fecha_registro: fecha_registro
                }
                // aqui guardo el usuario en la base de datos
                ajaxHelper(usuariosUri, 'POST', usuario).done(function (item) {
                    var estudiante = {
                        nombres: nombres,
                        apellidos: apellidos,
                        tdocumento: tdocumento,
                        ndocumento: documento,
                        telefono: telefono,
                        fecha_nacimiento: fecha_nacimiento,
                        direccion: direccion,
                        UsuarioId: item.Id
                    }
                    // aqui guardo el admin en la base de datos
                    ajaxHelper(estudiantesUri, 'POST', estudiante).done(function (data) {
                        self.estudiantes.push(data);
                    });
                });



                // lipiamos el formulario
                $('#nombres').val('');
                $('#apellidos').val('');
                $('#documento').val('');
                $('#tdocumento').val('');
                $('#direccion').val('');
                $('#telefono').val('');
                $('#contrasena').val('');
                $('#contrasena2').val('');
                $('#fecha_nacimiento').val('');

                Materialize.toast("Datos Guardados.", 5000);

                $('#progreso').hide();
            } catch (e) {
                Materialize.toast("No se ha podido guardar los datos.", 5000);
            }

        }
    }

    self.deleteEstudiante = function (estudiante) {
        // obtengo la session del usuario y verifico si es el root o el admin
        var usuario = JSON.parse(localStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario2'));
        if (usuario.UsuarioId === 1 || usuario.UsuarioId === 2) {
            if (confirm("¿Desea eliminar este usuario?")) {
                ajaxHelper(estudiantesUri + estudiante.Id, 'DELETE').done(function () {
                    ajaxHelper(usuariosUri + estudiante.UsuarioId, 'DELETE');
                });
                Materialize.toast("Se ha eliminado a " + estudiante.nombres + ".", 5000);
                self.estudiantes.pop(estudiante);
            }
        } else {
            Materialize.toast("Debe acceder como root o admin\n para realizar esta operacion. ");
        }

    }

    self.detalleEstudiante = function (estudiante) {
        // extrae el admin del array de objetos y lo independiza 
        self.detail(estudiante);
    }
    self.borrarEstudiante = function () {
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
                    if (confirm("¿Desea eliminar este usuario?")) {
                        ajaxHelper(estudiantesUri + estudiantes[e].Id, 'DELETE').done(function () {
                            ajaxHelper(usuariosUri + estudiantes[e].UsuarioId, 'DELETE');
                            $('#progreso').hide();
                        });
                        Materialize.toast("Se ha eliminado a " + estudiantes[e].nombres + ".", 5000);
                        self.estudiantes.pop(estudiantes[e]);
                        self.detail_modificar(null);
                    }
                    encontrado = true;

                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este Estudiante para mostrar. ");
            }
        });
    }

    self.updateEstudiante = function () {
        var nombres = $('#nnombres').val();
        var apellidos = $('#napellidos').val();
        var documento = $('#ndocumento').val();
        var tdocumento = $('#ntdocumento').val();
        var fecha_nacimiento = $('#nfecha_nacimiento').val();
        var direccion = $('#ndireccion').val();
        var telefono = $('#ntelefono').val();
        var Id = $('#id').val();
        var UsuarioId = $('#uid').val();

        try {


            var estudiante = {
                Id: Id,
                nombres: nombres,
                apellidos: apellidos,
                tdocumento: tdocumento,
                ndocumento: documento,
                fecha_nacimiento: fecha_nacimiento,
                telefono: telefono,
                direccion: direccion,
                UsuarioId: UsuarioId
            }

            // aqui guardo el admin en la base de datos
            ajaxHelper(estudiantesUri + Id, 'PUT', estudiante).done(function () {
                getAllEstudiantes();
                $('#progreso').hide();
            });



            // lipiamos el formulario
            $('#nnombres').val('');
            $('#napellidos').val('');
            $('#ndocumento').val('');
            $('#ntdocumento').val('');
            $('#ndireccion').val('');
            $('#ntelefono').val('');
            $('#nfecha_nacimiento').val('');

            self.detail_modificar(null);
            Materialize.toast("Datos Modificados.", 5000);


        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
            $('#progreso').hide();

        }
    }
    self.consultaEstudiante = function () {
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
                    self.detail_modificar(estudiantes[e]);
                    self.detail_enlazar(estudiantes[e]);
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este estudiante para mostrar. ");
            }
        });
    }
    // aaaaaaaaaaaaaaaaaaa----------------FIN------ Funciones para estudiantes

    // cargamos para mostrar
    getAllEstudiantes();
};

ko.applyBindings(new ViewModel());