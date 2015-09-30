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

namespace modelado_plantel.Controllers
{
    public class AsistenciasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Asistencias
        public IQueryable<Asistencia> GetAsistencias()
        {
            return db.Asistencias;
        }

        // GET: api/Asistencias/5
        [ResponseType(typeof(Asistencia))]
        public async Task<IHttpActionResult> GetAsistencia(int id)
        {
            Asistencia asistencia = await db.Asistencias.FindAsync(id);
            if (asistencia == null)
            {
                return NotFound();
            }

            return Ok(asistencia);
        }

        // PUT: api/Asistencias/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAsistencia(int id, Asistencia asistencia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asistencia.Id)
            {
                return BadRequest();
            }

            db.Entry(asistencia).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsistenciaExists(id))
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

        // POST: api/Asistencias
        [ResponseType(typeof(Asistencia))]
        public async Task<IHttpActionResult> PostAsistencia(Asistencia asistencia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Asistencias.Add(asistencia);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = asistencia.Id }, asistencia);
        }

        // DELETE: api/Asistencias/5
        [ResponseType(typeof(Asistencia))]
        public async Task<IHttpActionResult> DeleteAsistencia(int id)
        {
            Asistencia asistencia = await db.Asistencias.FindAsync(id);
            if (asistencia == null)
            {
                return NotFound();
            }

            db.Asistencias.Remove(asistencia);
            await db.SaveChangesAsync();

            return Ok(asistencia);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AsistenciaExists(int id)
        {
            return db.Asistencias.Count(e => e.Id == id) > 0;
        }
    }
}