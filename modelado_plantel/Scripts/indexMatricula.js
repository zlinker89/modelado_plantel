var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.jornadas = ko.observableArray();
    self.detail_modificar = ko.observable();
    self.cursos = ko.observableArray();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var estudiantesUri = '/api/Estudiantes/';
    var jornadasUri = '/api/Jornadas/';
    var cursosUri = '/api/Cursoes/';

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

    self.new_matricula = {
        Jornada: ko.observable(),
        Curso: ko.observable(),
        ProfesorAsignatura: ko.observable()
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

    function getAllJornadas() {
        ajaxHelper(jornadasUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.jornadas(data);
        });
    }

    function getAllCursos() {
        ajaxHelper(cursosUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.cursos(data);
        });
    }

    // aaaaaaaaaaaaaaaaaaa---------------------- Funciones para Matriculas
    
    self.consultaEstudiante = function () {
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
                    self.detail_modificar(estudiantes[e]);
                    $('select').material_select();
                    encontrado = true;
                }
            }
            $('#progreso').hide();
            if (!encontrado) {
                Materialize.toast("No existe este estudiante para mostrar. ");
            }
        });
    }
    // aaaaaaaaaaaaaaaaaaa----------------FIN------ Funciones para Matriculas

    // cargamos para mostrar
    getAllEstudiantes();
    getAllJornadas();
    getAllCursos();
};

ko.applyBindings(new ViewModel());