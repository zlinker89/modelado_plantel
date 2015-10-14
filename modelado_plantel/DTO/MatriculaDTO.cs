using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace modelado_plantel.DTO
{
    public class MatriculaDTO
    {
        public int Id { get; set; }
        public string fecha_matricula { get; set; }
        public int JornadaId { get; set; }
        public int CursoId { get; set; }
        public int ProfesorAsignaturaId { get; set; }
        public int EstudianteId { get; set; }
        public string nombreProfesor { get; set; }
        public string apellidoProfesor { get; set; }
        public string curso { get; set; }
        public string asignatura { get; set; }
    }
}