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
    public class SoldTicketsController : ApiController
    {
        IUnitOfWork unitOfWork;

        public SoldTicketsController(IUnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/SoldTickets
        public IEnumerable<SoldTicket> GetSoldTickets()
        {
            return unitOfWork.SoldTickets.GetAll();
        }

        // GET: api/SoldTickets/5
        [ResponseType(typeof(SoldTicket))]
        public IHttpActionResult GetSoldTicket(Guid id)
        {
            SoldTicket soldTicket = unitOfWork.SoldTickets.Get(id);
            if (soldTicket == null)
            {
                return NotFound();
            }

            return Ok(soldTicket);
        }

        // PUT: api/SoldTickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSoldTicket(Guid id, SoldTicket soldTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != soldTicket.Id)
            {
                return BadRequest();
            }

            unitOfWork.SoldTickets.Update(soldTicket);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoldTicketExists(id))
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

        // POST: api/SoldTickets
        [ResponseType(typeof(SoldTicket))]
        public IHttpActionResult PostSoldTicket(SoldTicket soldTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.SoldTickets.Add(soldTicket);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (SoldTicketExists(soldTicket.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = soldTicket.Id }, soldTicket);
        }

        // DELETE: api/SoldTickets/5
        [ResponseType(typeof(SoldTicket))]
        public IHttpActionResult DeleteSoldTicket(Guid id)
        {
            SoldTicket soldTicket = unitOfWork.SoldTickets.Get(id);
            if (soldTicket == null)
            {
                return NotFound();
            }

            unitOfWork.SoldTickets.Remove(soldTicket);
            unitOfWork.Complete();

            return Ok(soldTicket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SoldTicketExists(Guid id)
        {
            return unitOfWork.SoldTickets.Find(e => e.Id == id).Count() > 0;
        }
    }
}