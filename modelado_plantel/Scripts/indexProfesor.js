var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    self.asignaturas = ko.observableArray();
    self.profesores = ko.observableArray();
    self.asignaturaprodesor = ko.observableArray();
    // profesores
    self.detail = ko.observableArray();
    self.detail_modificar = ko.observable();
    self.error = ko.observable();
    self.newAsignaturaProfesor = {
        Asignatura: ko.observable()
    }

    var usuariosUri = '/api/Usuarios/';
    var asignaturasUri = '/api/Asignaturas/';
    var profesoresUri = '/api/Profesors/';
    var asignaturaprofesorUri = '/api/ProfesorAsignaturas/';

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

    function getAllProfesores() {
        ajaxHelper(profesoresUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.profesores(data);
        });
    }

    function getAllAsignaturas() {
        ajaxHelper(asignaturasUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.asignaturas(data);
        });
    }

    function getAllAsignaturaProfesor() {
        ajaxHelper(asignaturaprofesorUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.asignaturaprodesor(data);
        });
    }
    // zzzzzzzzzzzzzzzzzzzzzz-----------------------------Funciones para profesores
    self.addProfesor = function () {
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
                    var profesor = {
                        nombres: nombres,
                        apellidos: apellidos,
                        tdocumento: tdocumento,
                        ndocumento: documento,
                        telefono: telefono,
                        direccion: direccion,
                        UsuarioId: item.Id
                    }
                    // aqui guardo el admin en la base de datos
                    ajaxHelper(profesoresUri, 'POST', profesor).done(function (data) {
                        self.profesores.push(data);
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

    self.deleteProfesor = function (profesor) {
        // obtengo la session del usuario y verifico si es el root o el admin
        var usuario = JSON.parse(localStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario2'));
        if (usuario.UsuarioId === 1 || usuario.UsuarioId === 2) {
            if (confirm("¿Desea eliminar este usuario?")) {
                ajaxHelper(profesoresUri + profesor.Id, 'DELETE').done(function () {
                    ajaxHelper(usuariosUri + profesor.UsuarioId, 'DELETE');
                });
                Materialize.toast("Se ha eliminado a " + profesor.nombres + ".", 5000);
                self.profesores.remove(profesor);
            }
        } else {
            Materialize.toast("Debe acceder como root o admin\n para realizar esta operacion. ");
        }

    }

    self.detalleProfesor = function (profesor) {
        // extrae el admin del array de objetos y lo independiza 
        self.detail(profesor);
    }
    self.borrarProfesor = function () {
        ajaxHelper(profesoresUri, 'GET').done(function (profesores) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (p in profesores) {
                if (profesores[p].ndocumento === documento) {
                    if (confirm("¿Desea eliminar este usuario?")) {
                        ajaxHelper(profesoresUri + profesores[p].Id, 'DELETE').done(function () {
                            ajaxHelper(usuariosUri + profesores[p].UsuarioId, 'DELETE');
                            $('#progreso').hide();
                        });
                        Materialize.toast("Se ha eliminado a " + profesores[p].nombres + ".", 5000);
                        self.profesores.remove(profesores[p]);
                        self.detail_modificar(null);
                    }
                    encontrado = true;

                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este admin para mostrar. ");
            }
        });
    }

    self.updateProfesor = function () {
        var nombres = $('#nnombres').val();
        var apellidos = $('#napellidos').val();
        var documento = $('#ndocumento').val();
        var tdocumento = $('#ntdocumento').val();
        var direccion = $('#ndireccion').val();
        var telefono = $('#ntelefono').val();
        var Id = $('#id').val();
        var UsuarioId = $('#uid').val();

        try {


            var profesor = {
                Id: Id,
                nombres: nombres,
                apellidos: apellidos,
                tdocumento: tdocumento,
                ndocumento: documento,
                telefono: telefono,
                direccion: direccion,
                UsuarioId: UsuarioId
            }

            // aqui guardo el admin en la base de datos
            ajaxHelper(profesoresUri + Id, 'PUT', profesor).done(function () {
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
            getAllProfesores();
            Materialize.toast("Datos Modificados.", 5000);


        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
            $('#progreso').hide();

        }
    }
    self.consultaProfesor = function () {
        self.asignaturaprodesor.removeAll();
        ajaxHelper(profesoresUri, 'GET').done(function (profesores) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (p in profesores) {
                if (profesores[p].ndocumento === documento) {
                    self.detail_modificar(profesores[p]);
                    // ----------- Filtrar Relacion asignatura profesor
                    var pid = profesores[p].Id;
                   // getAllAsignaturaProfesor(); // aqui obtengo todas las relaciones
                    ajaxHelper(asignaturaprofesorUri, 'GET').done(function (AsignaturaProfesor) {
                        $('#progreso').hide();
                        // esto sirver para filtrar relaciones
                        for (ap in AsignaturaProfesor) {
                            if (AsignaturaProfesor[ap].ProfesorId == pid) {
                                self.asignaturaprodesor.push(AsignaturaProfesor[ap]); // filtro las asignaturas por profesor
                            }
                        }
                    });
                    $('select').material_select();
                    encontrado = true;
                }
            }
            if (!encontrado) {
                Materialize.toast("No existe este profesor para mostrar. ");
                $('#progreso').hide();
                self.detail_modificar(null);
            }
        });
    }
    // zzzzzzzzzzzzzzzzzzzz------------------------FIN funciones para profesores

    //--------------------->>>>>>>>>>>>>>>>>>>>>>>> ENLACE
    self.enlaceProfesorAsignatura = function () {
        var pid = $("#id").val();
        var aid = self.newAsignaturaProfesor.Asignatura().Id;
        var cont = 0;
        ajaxHelper(asignaturaprofesorUri, 'GET').done(function (AsignaturaProfesor) {
            
            $('#progreso').hide();
            for (ap in AsignaturaProfesor) {
                if (AsignaturaProfesor[ap].ProfesorId == pid && AsignaturaProfesor[ap].AsignaturaId == aid) {
                    cont++;
                }
            }
            if (cont > 0) {
                Materialize.toast("Este profesor ya posee esta asignatura. ");
            } else {
                var asigprofe = {
                    Id: pid,
                    ProfesorId: pid,
                    AsignaturaId: aid
                };
                ajaxHelper(asignaturaprofesorUri, 'POST', asigprofe).done(function (ap) {
                    self.detail_modificar(null);
                    getAllAsignaturaProfesor();
                    self.asignaturaprodesor.push(ap);
                    Materialize.toast("Enlace exitoso. ");
                });
            }
            $('#progreso').hide();

        });
    }
    self.deleteAsignaturaProfesor = function (AsigProfe) {
        if(confirm("¿Desea eliminar esta relacion?")){
            ajaxHelper(asignaturaprofesorUri + AsigProfe.Id, 'DELETE').done(function () {
                Materialize.toast("Se ha borrado a " + AsigProfe.nombreAsignatura + ". ");
                self.asignaturaprodesor.remove(AsigProfe);
                $('#progreso').hide();
            });
        }
    }
    //--------------------->>>>>>>>>>>>>>>>>>>>>>>> FIN ENLACE


    // cargamos para mostrar
    getAllProfesores();
    getAllAsignaturas();
};

ko.applyBindings(new ViewModel());