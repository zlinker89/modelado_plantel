using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Modelado;
using modelado_plantel.Models;
using modelado_plantel.DTO;

namespace modelado_plantel.Controllers
{
    public class ProfesorAsignaturasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/ProfesorAsignaturas
        public IQueryable<ProfesorAsignaturasDTO> GetProfesorAsignaturas()
        {
            var profesorasignatura = from ps in db.ProfesorAsignaturas
                                     select new ProfesorAsignaturasDTO()
                                     {
                                         Id = ps.Id,
                                         ProfesorId = ps.ProfesorId,
                                         AsignaturaId = ps.AsignaturaId,
                                         nombreAsignatura = ps.Asignatura.nombre_asignatura,
                                         nombreProfesor = ps.Profesor.nombres,
                                         apellidoProfesor = ps.Profesor.apellidos
                                     };
            return profesorasignatura;
        }

        // GET: api/ProfesorAsignaturas/5
        [ResponseType(typeof(ProfesorAsignatura))]
        public async Task<IHttpActionResult> GetProfesorAsignatura(int id)
        {
            ProfesorAsignatura profesorAsignatura = await db.ProfesorAsignaturas.FindAsync(id);
            if (profesorAsignatura == null)
            {
                return NotFound();
            }

            return Ok(profesorAsignatura);
        }

        // PUT: api/ProfesorAsignaturas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProfesorAsignatura(int id, ProfesorAsignatura profesorAsignatura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != profesorAsignatura.Id)
            {
                return BadRequest();
            }

            db.Entry(profesorAsignatura).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorAsignaturaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ProfesorAsignaturas
        [ResponseType(typeof(ProfesorAsignatura))]
        public async Task<IHttpActionResult> PostProfesorAsignatura(ProfesorAsignatura profesorAsignatura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProfesorAsignaturas.Add(profesorAsignatura);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = profesorAsignatura.Id }, profesorAsignatura);
        }

        // DELETE: api/ProfesorAsignaturas/5
        [ResponseType(typeof(ProfesorAsignatura))]
        public async Task<IHttpActionResult> DeleteProfesorAsignatura(int id)
        {
            ProfesorAsignatura profesorAsignatura = await db.ProfesorAsignaturas.FindAsync(id);
            if (profesorAsignatura == null)
            {
                return NotFound();
            }

            db.ProfesorAsignaturas.Remove(profesorAsignatura);
            await db.SaveChangesAsync();

            return Ok(profesorAsignatura);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProfesorAsignaturaExists(int id)
        {
            return db.ProfesorAsignaturas.Count(e => e.Id == id) > 0;
        }
    }
}