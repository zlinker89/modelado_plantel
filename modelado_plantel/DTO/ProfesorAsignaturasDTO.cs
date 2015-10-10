using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace modelado_plantel.DTO
{
    public class ProfesorAsignaturasDTO
    {
        public int Id { get; set; }
        public int ProfesorId { get; set; }
        public int AsignaturaId { get; set; }
        public String nombreAsignatura { get; set; }
        public String nombreProfesor { get; set; }
        public String apellidoProfesor { get; set; }
    }
}