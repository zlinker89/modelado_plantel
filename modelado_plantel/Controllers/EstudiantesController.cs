﻿using System;
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
    public class EstudiantesController : ApiController
    {
        private modelado_plantelContext db = new modelado_plantelContext();

        // GET: api/Estudiantes
        public IQueryable<Estudiante> GetEstudiantes()
        {
            return db.Estudiantes;
        }

        // GET: api/Estudiantes/5
        [ResponseType(typeof(Estudiante))]
        public async Task<IHttpActionResult> GetEstudiante(int id)
        {
            Estudiante estudiante = await db.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            return Ok(estudiante);
        }

        // PUT: api/Estudiantes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEstudiante(int id, Estudiante estudiante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estudiante.Id)
            {
                return BadRequest();
            }

            db.Entry(estudiante).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudianteExists(id))
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

        // POST: api/Estudiantes
        [ResponseType(typeof(Estudiante))]
        public async Task<IHttpActionResult> PostEstudiante(Estudiante estudiante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Estudiantes.Add(estudiante);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = estudiante.Id }, estudiante);
        }

        // DELETE: api/Estudiantes/5
        [ResponseType(typeof(Estudiante))]
        public async Task<IHttpActionResult> DeleteEstudiante(int id)
        {
            Estudiante estudiante = await db.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            db.Estudiantes.Remove(estudiante);
            await db.SaveChangesAsync();

            return Ok(estudiante);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstudianteExists(int id)
        {
            return db.Estudiantes.Count(e => e.Id == id) > 0;
        }
    }
}