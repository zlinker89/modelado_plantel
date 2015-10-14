var ViewModel = function () {
    var self = this;
    self.usuarios = ko.observableArray();
    self.estudiantes = ko.observableArray();
    self.profesorasignatura = ko.observableArray();
    self.matriculas = ko.observableArray();
    // elecciones
    self.chosenItems = ko.observableArray();
    self.jornadas = ko.observableArray();
    self.detail_modificar = ko.observable();
    self.cursos = ko.observableArray();

    self.error = ko.observable();

    var usuariosUri = '/api/Usuarios/';
    var estudiantesUri = '/api/Estudiantes/';
    var profesorasignaturaUri = '/api/ProfesorAsignaturas/';
    var jornadasUri = '/api/Jornadas/';
    var cursosUri = '/api/Cursoes/';
    var matriculaUri = '/api/Matriculas/';

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

    function getAllMatriculas() {
        ajaxHelper(matriculaUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.matriculas(data);
        });
    }

    function getAllProfesorAsignatura() {
        ajaxHelper(profesorasignaturaUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.profesorasignatura(data);
        });
    }

    // aaaaaaaaaaaaaaaaaaa---------------------- Funciones para Matriculas
    
    self.consultaEstudiante = function () {
        self.detail_modificar(null);
        self.chosenItems.removeAll();
        ajaxHelper(estudiantesUri, 'GET').done(function (estudiantes) {
            var documento = $('#numero').val();
            var encontrado = false;
            for (e in estudiantes) {
                if (estudiantes[e].ndocumento === documento) {
                    var EstudianteId = estudiantes[e].Id;
                    // listamos las matriculas hechas para este estudiante
                    ajaxHelper(matriculaUri, 'GET').done(function (matri) {
                        self.matriculas.removeAll();
                        $('#progreso').hide();
                        for (m in matri) {
                            if (matri[m].EstudianteId == EstudianteId) {
                                self.matriculas.push(matri[m]);
                            }
                        }
                    });
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

    self.addMatricula = function () {
        try{
            // obtengo la fecha de hoy
            var d = new Date();
            var fecha_registro = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var profesoresasignaturas = self.chosenItems();

            if (profesoresasignaturas.length !== 0) {
                ajaxHelper(matriculaUri, 'GET').done(function (matriculas) {
                    
                    for (pa in profesoresasignaturas) {
                        var Matricula = {
                            Id: $('#id').val(),
                            fecha_matricula: fecha_registro,
                            JornadaId: self.new_matricula.Jornada().Id,
                            CursoId: self.new_matricula.Curso().Id,
                            ProfesorAsignaturaId: profesoresasignaturas[pa].Id,
                            EstudianteId: $('#id').val()
                        }
                    
                            // creo el objeto matricula, analizo si existe en la base de datos, si existe no se guarda
                        var bandera = true;
                        for (m in matriculas) {
                            if (Matricula.JornadaId == matriculas[m].JornadaId && Matricula.CursoId == matriculas[m].CursoId && Matricula.ProfesorAsignaturaId == matriculas[m].ProfesorAsignaturaId && Matricula.EstudianteId == matriculas[m].EstudianteId) {
                                Materialize.toast("Ya exite una matricula con " + profesoresasignaturas[pa].nombreProfesor + " " + profesoresasignaturas[pa].apellidoProfesor + ". ", 1000);
                                bandera = false;
                                break;
                            }
                        };
                        if(bandera){
                            // aqui se genera la matricula
                            ajaxHelper(matriculaUri, 'POST', Matricula).done(function (m) {
                                Materialize.toast("Maticula Realizada con exito. ", 2000);
                                $('#progreso').hide();
                                self.detail_modificar(null);
                            });
                        }

                    
                    }
                });
                
            } else {
                Materialize.toast("Debe seleccionar minimo un profesor. ", 2000);
            }
            
            $('#progreso').hide();

        }catch(e){
            Materialize.toast("No se ha podido guardar. ",2000);
        }
        $('#progreso').hide();

    }

    function deleteMatricula(matricula) {
        if(confirm("¿Desea eliminar esta matricula?")){
            ajaxHelper(matriculaUri + matricula.Id, 'DELETE').done(function () {
                self.matriculas.remove(matricula);
                Materialize.toast("Matricula eliminada. ", 2000);
                $('#progreso').hide();
            });
        }
    }
    // aaaaaaaaaaaaaaaaaaa----------------FIN------ Funciones para Matriculas

    // cargamos para mostrar
    getAllEstudiantes();
    getAllJornadas();
    getAllCursos();
    getAllProfesorAsignatura();
    getAllMatriculas();
};

ko.applyBindings(new ViewModel());