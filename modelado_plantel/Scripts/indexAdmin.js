var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    // admin
    self.admins = ko.observableArray();
    self.detail = ko.observableArray();
    self.detail_modificar = ko.observable();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var adminsUri = '/api/Admins/';

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
    function getAllAdmins() {
        ajaxHelper(adminsUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.admins(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/
    





    // >>>>>>>-------------------------------FIN funciones evento con navegador

    // xxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------------funciones para admin
    self.addAdmin = function () {
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
                    var admin = {
                        nombres: nombres,
                        apellidos: apellidos,
                        tdocumento: tdocumento,
                        ndocumento: documento,
                        telefono: telefono,
                        direccion: direccion,
                        UsuarioId: item.Id
                    }
                    // aqui guardo el admin en la base de datos
                    ajaxHelper(adminsUri, 'POST', admin).done(function (data) {
                        self.admins.push(data);
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

    self.deleteAdmin = function (admin) {
        // obtengo la session del usuario y verifico si es el root o el admin
        var usuario = JSON.parse(localStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario2'));
        if (usuario.UsuarioId === 1 || usuario.UsuarioId === 2) {
            if (confirm("¿Desea eliminar este usuario?")) {
                ajaxHelper(adminsUri + admin.Id, 'DELETE').done(function () {
                    ajaxHelper(usuariosUri + admin.UsuarioId, 'DELETE');
                });
                Materialize.toast("Se ha eliminado a " + admin.nombres + ".", 5000);
                self.admins.remove(admin);
            }
        } else {
            Materialize.toast("Debe acceder como root o admin\n para realizar esta operacion. ");
        }

    }

    self.borrarAdmin = function () {
        ajaxHelper(adminsUri, 'GET').done(function (admins) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (a in admins) {
                if (admins[a].ndocumento === documento) {
                    if (confirm("¿Desea eliminar este usuario?")) {
                        ajaxHelper(adminsUri + admins[a].Id, 'DELETE').done(function () {
                            ajaxHelper(usuariosUri + admins[a].UsuarioId, 'DELETE');
                        });
                        Materialize.toast("Se ha eliminado a " + admins[a].nombres + ".", 5000);
                        self.admins.remove(admins[a]);
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
    self.detalleAdmin = function (admin) {
        // extrae el admin del array de objetos y lo independiza 
        self.detail(admin);
    }

    self.updateAdmin = function () {
        var nombres = $('#nnombres').val();
        var apellidos = $('#napellidos').val();
        var documento = $('#ndocumento').val();
        var tdocumento = $('#ntdocumento').val();
        var direccion = $('#ndireccion').val();
        var telefono = $('#ntelefono').val();
        var Id = $('#id').val();
        var UsuarioId = $('#uid').val();

        try {


            var admin = {
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
            ajaxHelper(adminsUri + Id, 'PUT', admin).done(function () {
                self.admins(null);
                getAllAdmins();
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
    self.consultaAdmin = function () {
        ajaxHelper(adminsUri, 'GET').done(function (admins) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (a in admins) {
                if (admins[a].ndocumento === documento) {
                    self.detail_modificar(admins[a]);
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este admin para mostrar. ");
            }
        });
    }
    // xxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------------FIN---funciones para admin





    // cargamos para mostrar
    getAllAdmins();
};

ko.applyBindings(new ViewModel());