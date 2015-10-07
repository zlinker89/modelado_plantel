var ViewModel = function () {
    var self = this;
    self.cursos = ko.observableArray();
    self.error = ko.observable();

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
    /*----------------------------------------- Functions para los roles ------------------1---*/

    function getAllCursos() {
        ajaxHelper(cursosUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.cursos(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/

    // xxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------------funciones para asignaturas
    self.addCurso = function () {
        var nombres = $('#nombres').val();
        try {
            String.prototype.capitalize = function () {
                return this.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
            };
            var curso = {
                nombre_curso: nombres.capitalize()
            }
            // aqui guardo el admin en la base de datos
            ajaxHelper(cursosUri, 'POST', curso).done(function (data) {
                self.cursos.push(data);
            });

            // lipiamos el formulario
            $('#nombres').val('');

            Materialize.toast("Datos Guardados.", 5000);
            $('#progreso').hide();

        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
        }


    }

    self.deleteCurso = function (curso) {
        if (confirm('¿Desea eliminar esta asignatura?')) {
            ajaxHelper(cursosUri + curso.Id, 'DELETE').done(function () {
                Materialize.toast("Se ha eliminado a " + curso.nombre_curso + ".", 5000);
                self.cursos.remove(curso);
            });
        }
    }

    // cargamos para mostrar
    getAllCursos();
};

ko.applyBindings(new ViewModel());