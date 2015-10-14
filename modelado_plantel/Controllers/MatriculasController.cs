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
    public class MatriculasController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Matriculas
        public IQueryable<MatriculaDTO> GetMatriculas()
        {
            var matricula = from m in db.Matriculas
                            select new MatriculaDTO()
                            {
                                Id = m.Id,
                                CursoId = m.CursoId,
                                EstudianteId = m.EstudianteId,
                                fecha_matricula = m.fecha_matricula,
                                JornadaId = m.JornadaId,
                                ProfesorAsignaturaId = m.ProfesorAsignaturaId,
                                curso = m.Curso.nombre_curso,
                                asignatura = m.ProfesorAsignatura.Asignatura.nombre_asignatura,
                                nombreProfesor = m.ProfesorAsignatura.Profesor.nombres,
                                apellidoProfesor = m.ProfesorAsignatura.Profesor.apellidos
                            };
            return matricula;
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