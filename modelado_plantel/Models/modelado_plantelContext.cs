using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace modelado_plantel.Models
{
    public class modelado_plantelContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public modelado_plantelContext() : base("name=modelado_plantelContext")
        {
        }

        public System.Data.Entity.DbSet<Modelado.Usuario> Usuarios { get; set; }

        public System.Data.Entity.DbSet<Modelado.Admin> Admins { get; set; }

        public System.Data.Entity.DbSet<Modelado.Asignatura> Asignaturas { get; set; }

        public System.Data.Entity.DbSet<Modelado.Asistencia> Asistencias { get; set; }

        public System.Data.Entity.DbSet<Modelado.Curso> Cursoes { get; set; }

        public System.Data.Entity.DbSet<Modelado.Estudiante> Estudiantes { get; set; }

        public System.Data.Entity.DbSet<Modelado.Jornada> Jornadas { get; set; }

        public System.Data.Entity.DbSet<Modelado.Matricula> Matriculas { get; set; }

        public System.Data.Entity.DbSet<Modelado.ProfesorAsignatura> ProfesorAsignaturas { get; set; }

        public System.Data.Entity.DbSet<Modelado.Notificacion> Notificacions { get; set; }

        public System.Data.Entity.DbSet<Modelado.Padre> Padres { get; set; }

        public System.Data.Entity.DbSet<Modelado.Profesor> Profesors { get; set; }
    
    }
}
