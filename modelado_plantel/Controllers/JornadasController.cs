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
    public class JornadasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Jornadas
        public IQueryable<JornadaDTO> GetJornadas()
        {
            var jornadas = from j in db.Jornadas
                           select new JornadaDTO()
                           {
                               Id = j.Id,
                               nombre_jornada = j.nombre_jornada
                           };
            return jornadas;
        }

        // GET: api/Jornadas/5
        [ResponseType(typeof(Jornada))]
        public async Task<IHttpActionResult> GetJornada(int id)
        {
            Jornada jornada = await db.Jornadas.FindAsync(id);
            if (jornada == null)
            {
                return NotFound();
            }

            return Ok(jornada);
        }

        // PUT: api/Jornadas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutJornada(int id, Jornada jornada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jornada.Id)
            {
                return BadRequest();
            }

            db.Entry(jornada).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JornadaExists(id))
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

        // POST: api/Jornadas
        [ResponseType(typeof(Jornada))]
        public async Task<IHttpActionResult> PostJornada(Jornada jornada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jornadas.Add(jornada);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = jornada.Id }, jornada);
        }

        // DELETE: api/Jornadas/5
        [ResponseType(typeof(Jornada))]
        public async Task<IHttpActionResult> DeleteJornada(int id)
        {
            Jornada jornada = await db.Jornadas.FindAsync(id);
            if (jornada == null)
            {
                return NotFound();
            }

            db.Jornadas.Remove(jornada);
            await db.SaveChangesAsync();

            return Ok(jornada);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JornadaExists(int id)
        {
            return db.Jornadas.Count(e => e.Id == id) > 0;
        }
    }
}