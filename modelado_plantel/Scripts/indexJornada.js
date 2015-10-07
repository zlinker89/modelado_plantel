var ViewModel = function () {
    var self = this;
    self.jornadas = ko.observableArray();
    self.error = ko.observable();

    var jornadasUri = '/api/Jornadas/';

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

    function getAllJornadas() {
        ajaxHelper(jornadasUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.jornadas(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/

    // xxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------------funciones para asignaturas
    self.addJornada = function () {
        var nombres = $('#nombres').val();
        try {
            String.prototype.capitalize = function () {
                return this.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
            };
            var jornada = {
                nombre_jornada: nombres.capitalize()
            }
            // aqui guardo el admin en la base de datos
            ajaxHelper(jornadasUri, 'POST', jornada).done(function (data) {
                self.jornadas.push(data);
            });

            // lipiamos el formulario
            $('#nombres').val('');

            Materialize.toast("Datos Guardados.", 5000);
            $('#progreso').hide();

        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
        }


    }

    self.deleteJornada = function (jornada) {
        if (confirm('¿Desea eliminar esta jornada?')) {
            ajaxHelper(jornadasUri + jornada.Id, 'DELETE').done(function () {
                Materialize.toast("Se ha eliminado a " + jornada.nombre_jornada + ".", 5000);
                self.jornadas.remove(jornada);
            });
        }
    }

    // cargamos para mostrar
    getAllJornadas();
};

ko.applyBindings(new ViewModel());