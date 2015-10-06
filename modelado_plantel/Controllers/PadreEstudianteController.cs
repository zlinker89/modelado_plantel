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
    public class PadreEstudianteController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET api/PadreEstudiante
        public IQueryable<PadreEstudianteDTO> GetEstudiantePadres()
        {
            var estudiantespadres = from ep in db.EstudiantePadres
                                    select new PadreEstudianteDTO()
                                    {
                                        Id = ep.Id,
                                        EstudianteId = ep.EstudianteId,
                                        PadreId = ep.PadreId,
                                        nombresPadre = ep.Padre.nombres,
                                        apellidosPadre = ep.Padre.nombres,
                                        nombresEstudiante = ep.Estudiante.nombres,
                                        apellidosEstudiante = ep.Estudiante.nombres
                                    };
            return estudiantespadres;
        }

        // GET api/PadreEstudiante/5
        [ResponseType(typeof(EstudiantePadre))]
        public async Task<IHttpActionResult> GetEstudiantePadre(int id)
        {
            EstudiantePadre estudiantepadre = await db.EstudiantePadres.FindAsync(id);
            if (estudiantepadre == null)
            {
                return NotFound();
            }

            return Ok(estudiantepadre);
        }

        // PUT api/PadreEstudiante/5
        public async Task<IHttpActionResult> PutEstudiantePadre(int id, EstudiantePadre estudiantepadre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estudiantepadre.Id)
            {
                return BadRequest();
            }

            db.Entry(estudiantepadre).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudiantePadreExists(id))
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

        // POST api/PadreEstudiante
        [ResponseType(typeof(EstudiantePadre))]
        public async Task<IHttpActionResult> PostEstudiantePadre(EstudiantePadre estudiantepadre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EstudiantePadres.Add(estudiantepadre);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = estudiantepadre.Id }, estudiantepadre);
        }

        // DELETE api/PadreEstudiante/5
        [ResponseType(typeof(EstudiantePadre))]
        public async Task<IHttpActionResult> DeleteEstudiantePadre(int id)
        {
            EstudiantePadre estudiantepadre = await db.EstudiantePadres.FindAsync(id);
            if (estudiantepadre == null)
            {
                return NotFound();
            }

            db.EstudiantePadres.Remove(estudiantepadre);
            await db.SaveChangesAsync();

            return Ok(estudiantepadre);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstudiantePadreExists(int id)
        {
            return db.EstudiantePadres.Count(e => e.Id == id) > 0;
        }
    }
}