var ViewModel = function () {
    var self = this;
    self.asignaturas= ko.observableArray();
    self.error = ko.observable();

    var asignaturasUri = '/api/Asignaturas/';

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

    function getAllAsignaturas() {
        ajaxHelper(asignaturasUri, 'GET').done(function (data) {
            $('#progreso').hide();
            self.asignaturas(data);
        });
    }

    /* -----------------------------------------FIN Functions para los roles*/






    // >>>>>>>-------------------------------FIN funciones evento con navegador

    // xxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------------funciones para asignaturas
    self.addAsignatura = function () {
        var nombres = $('#nombres').val();
        try {
            String.prototype.capitalize = function () {
                return this.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
            };
            var asignatura = {
                nombre_asignatura: nombres.capitalize()
            }
            // aqui guardo el admin en la base de datos
            ajaxHelper(asignaturasUri, 'POST', asignatura).done(function (data) {
                self.asignaturas.push(data);
            });

            // lipiamos el formulario
            $('#nombres').val('');

            Materialize.toast("Datos Guardados.", 5000);
            $('#progreso').hide();

        } catch (e) {
            Materialize.toast("No se ha podido guardar los datos.", 5000);
        }

        
    }

    self.deleteAsignatura = function (asignatura) {
        if (confirm('¿Desea eliminar esta asignatura?')) {
            ajaxHelper(asignaturasUri + asignatura.Id, 'DELETE').done(function () {
                Materialize.toast("Se ha eliminado a " + asignatura.nombre_asignatura + ".", 5000);
                self.asignaturas.remove(asignatura);
            });
        }
    }

    

    // cargamos para mostrar
    getAllAsignaturas();
};

ko.applyBindings(new ViewModel());