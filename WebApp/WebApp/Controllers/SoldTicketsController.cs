using Microsoft.AspNet.Identity;
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

        [Route("api/SoldTickets/Buy/{id}")]
        [HttpPost]
        [ResponseType(typeof(SoldTicket))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult BuyTicket(Guid id) {
            var userId = User.Identity.GetUserId();

            var productType = unitOfWork.ProductTypes.Get(id);

            if (productType == null) {
                return BadRequest("Invalid product type");
            }

            var userFromDb = unitOfWork.Users.Get(userId);

            if (userFromDb == null) {
                return InternalServerError();
            } else if (userFromDb.Status != "verified") {
                return BadRequest("User is not verified");
            }


            if (userFromDb.Type == null || userFromDb.Type.Trim().Length == 0) {
                return InternalServerError();
            }

            var activePricelist = unitOfWork.Pricelists.Find(x => x.From <= DateTime.Now && x.To >= DateTime.Now).FirstOrDefault();

            if (activePricelist == null) {
                return BadRequest("There are no active pricelists");
            }

            var coefficient = unitOfWork.Coefficients.Find(x => x.Type.ToLower() == userFromDb.Type.ToLower()).FirstOrDefault();

            if (coefficient == null) {
                return InternalServerError();
            }

            var ticketPrice = unitOfWork.PriceHistories.Find(x => x.ProductTypeId == productType.Id && x.PricelistId == activePricelist.Id).FirstOrDefault();

            if (ticketPrice == null) {
                return InternalServerError();
            }

            var soldAtPrice = ticketPrice.Price * coefficient.Value;

            SoldTicket soldTicket = new SoldTicket() {
                Id = Guid.NewGuid(),
                DateOfPurchase = DateTime.Now,
                Expires = DateTime.Now.AddDays(1),
                UserId = userId,
                Price = soldAtPrice,
                Usages = 0,
                Type = productType.Name
            };

            unitOfWork.SoldTickets.Add(soldTicket);
            try {
                unitOfWork.Complete();
            } catch (DbUpdateConcurrencyException) {
                if (!SoldTicketExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return Ok(soldTicket);
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

        // GET: api/SoldTickets/Valid/5
        [Route("api/SoldTickets/Valid/{id}")]
        [HttpGet]
        public IHttpActionResult IsSoldTicketValid(Guid id) {
            SoldTicket soldTicket = unitOfWork.SoldTickets.Get(id);

            if (soldTicket == null) {
                return NotFound();
            }

            if (soldTicket.Expires >= DateTime.Now) {
                soldTicket.Usages += 1;
                unitOfWork.SoldTickets.Update(soldTicket);
                unitOfWork.Complete();
                return Ok("valid");
            } else {
                return Ok("expired");
            }
        }

        // PUT: api/SoldTickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSoldTicket(Guid id, SoldTicket soldTicket)
        {
            if (!ModelState.IsValid || soldTicket == null)
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
            if (!ModelState.IsValid || soldTicket == null)
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