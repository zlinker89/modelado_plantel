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
    public class AsignaturasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Asignaturas
        public IQueryable<AsignaturaDTO> GetAsignaturas()
        {
            var asignaturas = from a in db.Asignaturas
                              select new AsignaturaDTO()
                              {
                                  Id = a.Id,
                                  nombre_asignatura = a.nombre_asignatura
                              };
            return asignaturas;
        }

        // GET: api/Asignaturas/5
        [ResponseType(typeof(Asignatura))]
        public async Task<IHttpActionResult> GetAsignatura(int id)
        {
            Asignatura asignatura = await db.Asignaturas.FindAsync(id);
            if (asignatura == null)
            {
                return NotFound();
            }

            return Ok(asignatura);
        }

        // PUT: api/Asignaturas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAsignatura(int id, Asignatura asignatura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asignatura.Id)
            {
                return BadRequest();
            }

            db.Entry(asignatura).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignaturaExists(id))
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

        // POST: api/Asignaturas
        [ResponseType(typeof(Asignatura))]
        public async Task<IHttpActionResult> PostAsignatura(Asignatura asignatura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Asignaturas.Add(asignatura);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = asignatura.Id }, asignatura);
        }

        // DELETE: api/Asignaturas/5
        [ResponseType(typeof(Asignatura))]
        public async Task<IHttpActionResult> DeleteAsignatura(int id)
        {
            Asignatura asignatura = await db.Asignaturas.FindAsync(id);
            if (asignatura == null)
            {
                return NotFound();
            }

            db.Asignaturas.Remove(asignatura);
            await db.SaveChangesAsync();

            return Ok(asignatura);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AsignaturaExists(int id)
        {
            return db.Asignaturas.Count(e => e.Id == id) > 0;
        }
    }
}