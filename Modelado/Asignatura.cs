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
    
    public partial class Asignatura
    {
        public Asignatura()
        {
            this.ProfesorAsignatura = new HashSet<ProfesorAsignatura>();
        }
    
        public int Id { get; set; }
        public string nombre_asignatura { get; set; }
    
        public virtual ICollection<ProfesorAsignatura> ProfesorAsignatura { get; set; }
    }
}