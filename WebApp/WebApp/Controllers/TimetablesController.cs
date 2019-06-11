﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class TimetablesController : ApiController
    {
        IUnitOfWork unitOfWork;

        public TimetablesController(IUnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Timetables
        public IEnumerable<Timetable> GetTimetables()
        {
            return unitOfWork.TimeTables.GetAll();
        }

        // GET: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult GetTimetable(Guid id)
        {
            Timetable timetable = unitOfWork.TimeTables.Get(id);
            if (timetable == null)
            {
                return NotFound();
            }

            return Ok(timetable);
        }

        // PUT: api/Timetables/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutTimetable(Guid id, Timetable timetable)
        {
            if (!ModelState.IsValid || timetable == null)
            {
                return BadRequest(ModelState);
            }

            if (id != timetable.Id)
            {
                return BadRequest();
            }

            Timetable db_timetable = unitOfWork.TimeTables.Get(timetable.Id);
            if (db_timetable == null)
                return NotFound();

            db_timetable.Times = timetable.Times;
            db_timetable.LineId = timetable.LineId;
            unitOfWork.TimeTables.Update(db_timetable);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetableExists(id))
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

        // POST: api/Timetables
        [ResponseType(typeof(Timetable))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostTimetable(Timetable timetable)
        {
            if (!ModelState.IsValid || timetable == null)
            {
                return BadRequest(ModelState);
            }

            timetable.ValidFrom = DateTime.Now;

            unitOfWork.TimeTables.Add(timetable);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (TimetableExists(timetable.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = timetable.Id }, timetable);
        }

        // DELETE: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult DeleteTimetable(Guid id)
        {
            Timetable timetable = unitOfWork.TimeTables.Get(id);
            if (timetable == null)
            {
                return NotFound();
            }
            
            unitOfWork.TimeTables.Remove(timetable);
            unitOfWork.Complete();

            return Ok(timetable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TimetableExists(Guid id)
        {
            return unitOfWork.TimeTables.Find(e => e.Id == id).Count() > 0;
        }
    }
}