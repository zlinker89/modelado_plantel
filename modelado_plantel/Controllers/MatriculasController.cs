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
    public class MatriculasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Matriculas
        public IQueryable<Matricula> GetMatriculas()
        {
            return db.Matriculas;
        }

        // GET: api/Matriculas/5
        [ResponseType(typeof(Matricula))]
        public async Task<IHttpActionResult> GetMatricula(int id)
        {
            Matricula matricula = await db.Matriculas.FindAsync(id);
            if (matricula == null)
            {
                return NotFound();
            }

            return Ok(matricula);
        }

        // PUT: api/Matriculas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMatricula(int id, Matricula matricula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matricula.Id)
            {
                return BadRequest();
            }

            db.Entry(matricula).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatriculaExists(id))
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

        // POST: api/Matriculas
        [ResponseType(typeof(Matricula))]
        public async Task<IHttpActionResult> PostMatricula(Matricula matricula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Matriculas.Add(matricula);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = matricula.Id }, matricula);
        }

        // DELETE: api/Matriculas/5
        [ResponseType(typeof(Matricula))]
        public async Task<IHttpActionResult> DeleteMatricula(int id)
        {
            Matricula matricula = await db.Matriculas.FindAsync(id);
            if (matricula == null)
            {
                return NotFound();
            }

            db.Matriculas.Remove(matricula);
            await db.SaveChangesAsync();

            return Ok(matricula);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatriculaExists(int id)
        {
            return db.Matriculas.Count(e => e.Id == id) > 0;
        }
    }
}