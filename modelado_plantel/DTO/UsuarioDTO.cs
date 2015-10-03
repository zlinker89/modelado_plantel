using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace modelado_plantel.DTO
{
    public class UsuarioDTO
    {
        
    
        public int Id { get; set; }
        public string nombreusuario { get; set; }
        public string contrasena { get; set; }
        public System.DateTime fecha_registro { get; set; }
    
    }
}