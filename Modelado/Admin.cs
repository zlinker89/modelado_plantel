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
    
    public partial class Admin
    {
        public int Id { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string tdocumento { get; set; }
        public string ndocumento { get; set; }
        public string telefono { get; set; }
        public string direccion { get; set; }
        public int UsuarioId { get; set; }
    
        public virtual Usuario Usuario { get; set; }
    }
}