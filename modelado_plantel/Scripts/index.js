var ViewModel = function () {
    var self = this;
    var usuarios,estudiantes,padres,profesores,admins;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.profesores = ko.observableArray();
    self.padres = ko.observableArray();
    self.admins = ko.observableArray();
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
                
                cont = 0; // con el fin de que se salga de la funcion y no imprima mas de un mensaje de error
                
                break;
            } else { cont++; }

        }
        switch (rol) {
                    case "1":
                        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
                            $('#progreso').hide();
                            for (var e in estudiantes) {
                                if (usuarioid === estudiantes[e].UsuarioId) {
                                    cont = 0;
                                    alert("bienvenido estudiante");
                                } else { cont++; }
                            }
                            if (cont > 0) {
                                self.error("Usuario o contraseña invalidos.");
                                Materialize.toast("Usuario o contraseña invalidos.", 5000);
                            }
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
                                    cont = 0;
                                    
                                    // creamos el objeto con los datos a almacenar en la session 
                                    var datos = JSON.stringify(admins[a]);
                                    // Pasamos los datos a la sesion de tipo aplication
                                    if (localStorage.getItem('alcance') === 'aplication') {
                                        localStorage.setItem('rol', 4);
                                        localStorage.setItem('usuario', datos);
                                    } else {
                                        sessionStorage.setItem('rol', 4);
                                        sessionStorage.setItem('usuario', datos);
                                    }
                                    location.href = "admin.html";

                                } else { cont++; }
                            }
                            if (cont > 0) {
                                self.error("Usuario o contraseña invalidos.");
                                Materialize.toast("Usuario o contraseña invalidos.", 5000);
                            }
                        });
                        break;
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
};

ko.applyBindings(new ViewModel());