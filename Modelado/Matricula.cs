//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Modelado
{
    using System;
    using System.Collections.Generic;
    
    public partial class Matricula
    {
        public Matricula()
        {
            this.Asistencia = new HashSet<Asistencia>();
            this.HorarioMatricula = new HashSet<HorarioMatricula>();
        }
    
        public int Id { get; set; }
        public string fecha_matricula { get; set; }
        public int JornadaId { get; set; }
        public int CursoId { get; set; }
        public int ProfesorAsignaturaId { get; set; }
        public int EstudianteId { get; set; }
    
        public virtual Jornada Jornada { get; set; }
        public virtual Curso Curso { get; set; }
        public virtual ProfesorAsignatura ProfesorAsignatura { get; set; }
        public virtual ICollection<Asistencia> Asistencia { get; set; }
        public virtual ICollection<HorarioMatricula> HorarioMatricula { get; set; }
        public virtual Estudiante Estudiante { get; set; }
    }
}
