var ViewModel = function () {
    var self = this;
    //var usuarios,estudiantes,padres,profesores,admins;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.profesores = ko.observableArray();
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
    var profesoresUri = '/api/Profesors/';
    var adminsUri = '/api/Admins/';
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


    

    // cargamos para mostrar
    getAllAdmins();
    getAllProfesores();
    getAllEstudiantes();
    getAllPadres();
};

ko.applyBindings(new ViewModel());