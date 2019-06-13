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
    public class BusStopsController : ApiController
    {
        private IUnitOfWork unitOfWork;
        public BusStopsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/BusStops
        public IEnumerable<BusStop> GetBusStops()
        {
            return unitOfWork.BusStops.GetAll();
        }

        // GET: api/BusStops/5
        [ResponseType(typeof(BusStop))]
        public IHttpActionResult GetBusStop(Guid id)
        {
            BusStop busStop = unitOfWork.BusStops.Get(id);
            if (busStop == null)
            {
                return NotFound();
            }

            return Ok(busStop);
        }

        // PUT: api/BusStops/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutBusStop(Guid id, BusStop busStop)
        {
            if (!ModelState.IsValid || busStop == null)
            {
                return BadRequest(ModelState);
            }

            if (id != busStop.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.BusStops.Update(busStop);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusStopExists(id))
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

        // POST: api/BusStops
        [ResponseType(typeof(BusStop))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostBusStop(BusStop busStop)
        {
            if (!ModelState.IsValid || busStop == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                unitOfWork.BusStops.Add(busStop);
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (BusStopExists(busStop.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = busStop.Id }, busStop);
        }

        // DELETE: api/BusStops/5
        [ResponseType(typeof(BusStop))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteBusStop(Guid id)
        {
            BusStop busStop = unitOfWork.BusStops.Get(id);
            if (busStop == null)
            {
                return NotFound();
            }

            unitOfWork.BusStops.Remove(busStop);
            unitOfWork.Complete();

            return Ok(busStop);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BusStopExists(Guid id)
        {
            return unitOfWork.BusStops.Find(e => e.Id == id).Count() > 0;
        }
    }
}