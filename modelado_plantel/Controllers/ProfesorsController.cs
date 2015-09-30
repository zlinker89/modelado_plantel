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
    public class ProfesorsController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Profesors
        public IQueryable<Profesor> GetProfesors()
        {
            return db.Profesors;
        }

        // GET: api/Profesors/5
        [ResponseType(typeof(Profesor))]
        public async Task<IHttpActionResult> GetProfesor(int id)
        {
            Profesor profesor = await db.Profesors.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            return Ok(profesor);
        }

        // PUT: api/Profesors/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProfesor(int id, Profesor profesor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != profesor.Id)
            {
                return BadRequest();
            }

            db.Entry(profesor).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorExists(id))
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

        // POST: api/Profesors
        [ResponseType(typeof(Profesor))]
        public async Task<IHttpActionResult> PostProfesor(Profesor profesor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Profesors.Add(profesor);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = profesor.Id }, profesor);
        }

        // DELETE: api/Profesors/5
        [ResponseType(typeof(Profesor))]
        public async Task<IHttpActionResult> DeleteProfesor(int id)
        {
            Profesor profesor = await db.Profesors.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            db.Profesors.Remove(profesor);
            await db.SaveChangesAsync();

            return Ok(profesor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProfesorExists(int id)
        {
            return db.Profesors.Count(e => e.Id == id) > 0;
        }
    }
}