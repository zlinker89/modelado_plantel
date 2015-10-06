using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace modelado_plantel.DTO
{
    public class PadreEstudianteDTO
    {
        public int Id { get; set; }
        public int EstudianteId { get; set; }
        public int PadreId { get; set; }
        public String nombresPadre { get; set; }
        public String apellidosPadre { get; set; }
        public String nombresEstudiante { get; set; }
        public String apellidosEstudiante { get; set; }

    }
}