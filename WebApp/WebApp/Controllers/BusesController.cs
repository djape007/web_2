using System;
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
    public class BusesController : ApiController {
        private IUnitOfWork unitOfWork;

        public BusesController(IUnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Buses
        public IEnumerable<Bus> GetBuses()
        {
            return unitOfWork.Buses.GetAll();
        }

        // GET: api/Buses/5
        [ResponseType(typeof(Bus))]
        public IHttpActionResult GetBus(string id)
        {
            Bus bus = unitOfWork.Buses.Get(id);
            if (bus == null)
            {
                return NotFound();
            }

            return Ok(bus);
        }
        // PUT: api/Buses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBus(string id, Bus bus)
        {
            if (!ModelState.IsValid || bus == null)
            {
                return BadRequest(ModelState);
            }

            if (id != bus.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Buses.Update(bus);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusExists(id))
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

        // POST: api/Buses
        [ResponseType(typeof(Bus))]
        public IHttpActionResult PostBus(Bus bus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                unitOfWork.Buses.Add(bus);
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (BusExists(bus.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bus.Id }, bus);
        }

        // DELETE: api/Buses/5
        [ResponseType(typeof(Bus))]
        public IHttpActionResult DeleteBus(string id)
        {
            Bus bus = unitOfWork.Buses.Get(id);
            if (bus == null)
            {
                return NotFound();
            }

            unitOfWork.Buses.Remove(bus);
            unitOfWork.Complete();

            return Ok(bus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BusExists(string id)
        {
            return unitOfWork.Buses.Find(e => e.Id == id).Count() > 0;
        }
    }
}