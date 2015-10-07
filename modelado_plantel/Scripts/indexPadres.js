var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.padres = ko.observableArray();
    self.PadresEstudiantes = ko.observableArray();
    // admin
    self.admins = ko.observableArray();
    self.detail = ko.observableArray();
    self.detail_modificar = ko.observable();
    self.detail_enlazar = ko.observable();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var estudiantesUri = '/api/Estudiantes/';
    var padresUri = '/api/Padres/';
    var padreestudianteUri = '/api/PadreEstudiante/';

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
    function getAllPadreEstudiante() {
        ajaxHelper(padreestudianteUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.PadresEstudiantes(data);
        });
    }

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
    function getAllPadres() {
        ajaxHelper(padresUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.padres(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/
  

    // aaaaaaaaaaaaaaaaaaa---------------------- Funciones para estudiantes
    self.consultaEstudiante2 = function () {
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
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

    // bbbbbbbbbbbbbbbbbbb-------------------------Funciones para padres
    self.addPadre = function () {
        var nombres = $('#nombres').val();
        var apellidos = $('#apellidos').val();
        var documento = $('#documento').val();
        var tdocumento = $('#tdocumento').val();
        var direccion = $('#direccion').val();
        var telefono = $('#telefono').val();
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
                    var padre = {
                        nombres: nombres,
                        apellidos: apellidos,
                        tdocumento: tdocumento,
                        ndocumento: documento,
                        telefono: telefono,
                        direccion: direccion,
                        UsuarioId: item.Id
                    }
                    // aqui guardo el admin en la base de datos
                    ajaxHelper(padresUri, 'POST', padre).done(function (data) {
                        self.padres.push(data);
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

                Materialize.toast("Datos Guardados.", 5000);

                $('#progreso').hide();
            } catch (e) {
                Materialize.toast("No se ha podido guardar los datos.", 5000);
            }

        }
    }

    self.deletePadre = function (padre) {
        // obtengo la session del usuario y verifico si es el root o el admin
        var usuario = JSON.parse(localStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario2'));
        if (usuario.UsuarioId === 1 || usuario.UsuarioId === 2) {
            if (confirm("¿Desea eliminar este usuario?")) {
                ajaxHelper(padresUri + padre.Id, 'DELETE').done(function () {
                    ajaxHelper(usuariosUri + padre.UsuarioId, 'DELETE');
                });
                Materialize.toast("Se ha eliminado a " + padre.nombres + ".", 5000);
                self.padres.remove(padre);
            }
        } else {
            Materialize.toast("Debe acceder como root o admin\n para realizar esta operacion. ");
        }

    }

    self.detallePadre = function (padre) {
        // extrae el admin del array de objetos y lo independiza 
        self.detail(padre);
    }
    self.borrarPadre = function () {
        ajaxHelper(padresUri, 'GET').done(function (padres) {
            var documento = $('#nnumero').val();
            var encontrado = false;
            for (p in padres) {
                if (padres[p].ndocumento === documento) {
                    if (confirm("¿Desea eliminar este usuario?")) {
                        ajaxHelper(padresUri + padres[p].Id, 'DELETE').done(function () {
                            ajaxHelper(usuariosUri + padres[p].UsuarioId, 'DELETE');
                            $('#progreso').hide();
                        });
                        Materialize.toast("Se ha eliminado a " + padres[p].nombres + ".", 5000);
                        self.profesores.remove(padres[p]);
                        self.detail_modificar(null);
                    }
                    encontrado = true;

                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este padre para mostrar. ");
            }
        });
    }

    self.updatePadre = function () {
        var nombres = $('#nnombres').val();
        var apellidos = $('#napellidos').val();
        var documento = $('#ndocumento').val();
        var tdocumento = $('#ntdocumento').val();
        var direccion = $('#ndireccion').val();
        var telefono = $('#ntelefono').val();
        var Id = $('#id').val();
        var UsuarioId = $('#uid').val();

        try {


            var padre = {
                Id: Id,
                nombres: nombres,
                apellidos: apellidos,
                tdocumento: tdocumento,
                ndocumento: documento,
                telefono: telefono,
                direccion: direccion,
                UsuarioId: UsuarioId
            }

            // aqui guardo el padre en la base de datos
            ajaxHelper(padresUri + Id, 'PUT', padre).done(function () {
                $('#progreso').hide();
            });



            // lipiamos el formulario
            $('#nnombres').val('');
            $('#napellidos').val('');
            $('#ndocumento').val('');
            $('#ntdocumento').val('');
            $('#ndireccion').val('');
            $('#ntelefono').val('');

            self.detail_modificar(null);
            Materialize.toast("Datos Modificados.", 5000);


        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
            $('#progreso').hide();

        }
    }
    self.consultaPadre = function () {
        getAllPadreEstudiante();
        ajaxHelper(padresUri, 'GET').done(function (padres) {
            var documento = $('#nnumero').val();
            var encontrado = false;
            for (p in padres) {
                if (padres[p].ndocumento === documento) {
                    self.detail_modificar(padres[p]);
                    var id = padres[p].Id;
                    ajaxHelper(padreestudianteUri, 'GET').done(function (data) {
                        self.PadresEstudiantes.removeAll();
                        for (d in data) {
                            if (data[d].PadreId === id) {
                                self.PadresEstudiantes.push(data[d]);
                            } else {

                            }
                        }
                    });
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este padre para mostrar. ");
                self.detail_modificar(null);
                self.detail_enlazar(null);
            }
        });
    }

    self.enlacePadreEstudiante = function () {
        var pid = $('#id').val();
        var eid = $('#eid').val();
        var cont = 0;

        ajaxHelper(padreestudianteUri, 'GET').done(function (data) {
            for (d in data) {
                if (data[d].PadreId.toString() === pid && data[d].EstudianteId.toString() === eid) {
                    cont++;
                }
            }
            if (cont > 0) {
                Materialize.toast("Ya existe esta relacion entre padre e hijo. ");
            } else {
                var estudiantepadre = {
                    Id: pid,
                    PadreId: pid,
                    EstudianteId: eid
                }
                ajaxHelper(padreestudianteUri, 'POST', estudiantepadre).done(function () {
                    Materialize.toast("Relacion entre padre e hijo exitosa. ");
                });
            }
            self.detail_enlazar(null);
            self.detail_modificar(null);
            $('#progreso').hide();
        });
    }

    self.deletePadreEstudiante = function (padreestudiante) {
        if (confirm("¿Desea eliminar esta relacion?")) {
            ajaxHelper(padreestudianteUri + padreestudiante.Id, 'DELETE').done(function () {
                self.PadresEstudiantes.pop(padreestudiante);
                Materialize.toast("Se ha eliminado esta relacion");
            });
        }
    }
    // bbbbbbbbbbbbbbbbbbb----------------FIN---------Funciones para padres


    // cargamos para mostrar
    getAllEstudiantes();
    getAllPadres();
    getAllPadreEstudiante();
};

ko.applyBindings(new ViewModel());