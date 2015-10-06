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
    public class PadresController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Padres
        public IQueryable<PadreDTO> GetPadres()
        {
            var padres = from p in db.Padres
                         select new PadreDTO()
                         {
                             Id = p.Id,
                             nombres = p.nombres,
                             apellidos = p.apellidos,
                             tdocumento = p.tdocumento,
                             ndocumento = p.ndocumento,
                             direccion = p.direccion,
                             telefono = p.telefono,
                             UsuarioId = p.UsuarioId
                         };
            return padres;
        }

        // GET: api/Padres/5
        [ResponseType(typeof(Padre))]
        public async Task<IHttpActionResult> GetPadre(int id)
        {
            Padre padre = await db.Padres.FindAsync(id);
            if (padre == null)
            {
                return NotFound();
            }

            return Ok(padre);
        }

        // PUT: api/Padres/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPadre(int id, Padre padre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != padre.Id)
            {
                return BadRequest();
            }

            db.Entry(padre).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PadreExists(id))
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

        // POST: api/Padres
        [ResponseType(typeof(Padre))]
        public async Task<IHttpActionResult> PostPadre(Padre padre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Padres.Add(padre);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = padre.Id }, padre);
        }

        // DELETE: api/Padres/5
        [ResponseType(typeof(Padre))]
        public async Task<IHttpActionResult> DeletePadre(int id)
        {
            Padre padre = await db.Padres.FindAsync(id);
            if (padre == null)
            {
                return NotFound();
            }

            db.Padres.Remove(padre);
            await db.SaveChangesAsync();

            return Ok(padre);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PadreExists(int id)
        {
            return db.Padres.Count(e => e.Id == id) > 0;
        }
    }
}