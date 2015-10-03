using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace modelado_plantel.DTO
{
    public class AdminDTO
    {
        public int Id { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string tdocumento { get; set; }
        public string ndocumento { get; set; }
        public string telefono { get; set; }
        public string direccion { get; set; }
        public int UsuarioId { get; set; }
    }
}