var ViewModel = function () {
    var self = this;
    var usuarios,estudiantes,padres,profesores,admins;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.profesores = ko.observableArray();
    self.padres = ko.observableArray();
    // admin
    self.admins = ko.observableArray();
    self.detail = ko.observableArray();
    self.detail_modificar = ko.observable();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var estudiantesUri = '/api/Estudiantes/';
    var padresUri = '/api/Padres/';
    var profesoresUri = '/api/Profesors/';
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

    function getAllEstudiantes() {
        ajaxHelper(estudiantesUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.estudiantes(data);
        });
    }

    function getAllProfesores() {
        ajaxHelper(profesoresUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.profesores(data);
        });
    }
    function getAllPadres() {
        ajaxHelper(padresUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.padres(data);
        });
    }
    function getAllAdmins() {
        ajaxHelper(adminsUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.admins(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/
    function login(usuarios) {
        // Fetch the initial data.
        var nombreusaurio = $(".usuario").val();
        var contrasena = $(".contrasena").val();
        var rol = $("#rol").val();
        var cont = 0; // sirve pra controlar los errores
        var usuarioid;
        for (var u in usuarios) {
            
            if (usuarios[u].nombreusuario == nombreusaurio && usuarios[u].contrasena == contrasena) {
                usuarioid = usuarios[u].Id;
                
                cont = 1; // con el fin de que se salga de la funcion y no imprima mas de un mensaje de error
                switch (rol) {
                    case "1":
                        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {

                        });
                        break;
                    case "2":
                        ajaxHelper(profesoresUri, 'GET').done(function (profesores) {
                            $('#progreso').hide();
                            for (var p in profesores) {
                                if (usuarioid === profesores[p].UsuarioId) {
                                    cont = 0;
                                    alert("bienvenido profesor");
                                } else { cont++; }
                            }
                            if (cont > 0) {
                                self.error("Usuario o contraseña invalidos.");
                                Materialize.toast("Usuario o contraseña invalidos.", 5000);
                            }
                        });
                        break;
                    case "3":
                        ajaxHelper(padresUri, 'GET').done(function (padres) {
                            $('#progreso').hide();
                            for (var p in padres) {
                                if (usuarioid === padres[e].UsuarioId) {
                                    cont = 0;
                                    alert("bienvenido padre");
                                } else { cont++; }
                            }
                            if (cont > 0) {
                                self.error("Usuario o contraseña invalidos.");
                                Materialize.toast("Usuario o contraseña invalidos.", 5000);
                            }
                        });
                        break;
                    case "4":
                        ajaxHelper(adminsUri, 'GET').done(function (admins) {
                            $('#progreso').hide();
                            for (var a in admins) {
                                if (usuarioid === admins[a].UsuarioId) {
                                    cont = 2;

                                    // creamos el objeto con los datos a almacenar en la session 
                                    var datos = JSON.stringify(admins[a]);
                                    // Pasamos los datos a la sesion de tipo aplication
                                    if (localStorage.getItem('alcance') !== undefined) {
                                        localStorage.setItem('rol', 4);
                                        localStorage.setItem('usuario', datos);
                                    } else {
                                        // esto porque sessionStorage no funciona en otra pagina
                                        localStorage.setItem('rol2', 4);
                                        localStorage.setItem('usuario2', datos);
                                    }
                                    location.href = "admin.html";
                                }
                            }
                            if (cont < 2) {
                                self.error("Usuario o contraseña invalidos.");
                                Materialize.toast("Usuario o contraseña invalidos.", 5000);
                            }

                        });
                        break;
                }

            }
            

        }
        if (cont < 1) {
            self.error("Usuario o contraseña invalidos.");
            Materialize.toast("Usuario o contraseña invalidos.", 5000);
        }
        
        
        
    }

    // >>>>>>>---------------------------------------------funciones evento con navegador
    self.login = function () {
        ajaxHelper(usuariosUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.usuarios(data);
            login(data);
        });
    }

    

    

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
                ajaxHelper(adminsUri + admin.Id, 'DELETE').done(function() {
                    ajaxHelper(usuariosUri + admin.UsuarioId, 'DELETE');
                });
                Materialize.toast("Se ha eliminado a " + admin.nombres + ".", 5000);
                self.admins.remove(admin);
            }
        } else {
            Materialize.toast("Debe acceder como root o admin\n para realizar esta operacion. ");
        }
        
    }

    self.borrarAdmin = function() {
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
    self.consultaAdmin = function() {
        ajaxHelper(adminsUri, 'GET').done(function (admins) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (a in admins) {
                if(admins[a].ndocumento === documento){
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
                    ajaxHelper(profesoresUri,'POST', profesor).done(function (data) {
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
            Materialize.toast("Datos Modificados.", 5000);


        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
            $('#progreso').hide();

        }
    }
    self.consultaProfesor = function () {
        ajaxHelper(profesoresUri, 'GET').done(function (profesores) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (p in profesores) {
                if (profesores[p].ndocumento === documento) {
                    self.detail_modificar(profesores[p]);
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este profesor para mostrar. ");
            }
        });
    }
    // zzzzzzzzzzzzzzzzzzzz------------------------FIN funciones para profesores

    // aaaaaaaaaaaaaaaaaaa---------------------- Funciones para estudiantes
    self.addEstudiante = function () {
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
                    var estudiante = {
                        nombres: nombres,
                        apellidos: apellidos,
                        tdocumento: tdocumento,
                        ndocumento: documento,
                        telefono: telefono,
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
                self.profesores.remove(estudiante);
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
                        Materialize.toast("Se ha eliminado a " + estudiantess[e].nombres + ".", 5000);
                        self.estudiantes.remove(estudiantes[e]);
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
                telefono: telefono,
                direccion: direccion,
                UsuarioId: UsuarioId
            }

            // aqui guardo el admin en la base de datos
            ajaxHelper(estudiantesUri + Id, 'PUT', estudiante).done(function () {
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
    self.consultaEstudiante = function () {
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
                    self.detail_modificar(estudiantes[e]);
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este profesor para mostrar. ");
            }
        });
    }
    // aaaaaaaaaaaaaaaaaaa----------------FIN------ Funciones para estudiantes


    // cargamos para mostrar
    getAllAdmins();
    getAllProfesores();
    getAllEstudiantes();
};

ko.applyBindings(new ViewModel());