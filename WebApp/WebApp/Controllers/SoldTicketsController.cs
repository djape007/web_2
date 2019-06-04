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

        [Route("api/SoldTickets/BuyAnonymous")]
        [HttpPost]
        [ResponseType(typeof(SoldTicket))]
        public IHttpActionResult BuyTicketAnonymous()
        {
            var productType = unitOfWork.ProductTypes.Find(x => x.ExpiresAfterHours == 1).FirstOrDefault();
    
            if (productType == null)
            {
                return BadRequest("Proizvod ne postoji");
            }

            var activePricelist = unitOfWork.Pricelists.Find(x => x.From <= DateTime.Now && x.To >= DateTime.Now).FirstOrDefault();

            if (activePricelist == null)
            {
                return BadRequest("Nema aktivnih cenovnika");
            }

            var coefficient = unitOfWork.Coefficients.Find(x => x.Type.ToLower() == "obican").FirstOrDefault();

            if (coefficient == null)
            {
                return InternalServerError();
            }

            var ticketPrice = unitOfWork.PriceHistories.Find(x => x.ProductTypeId == productType.Id && x.PricelistId == activePricelist.Id).FirstOrDefault();

            if (ticketPrice == null)
            {
                return InternalServerError();
            }

            var soldAtPrice = ticketPrice.Price * coefficient.Value;
            TimeSpan ticketExpiresIn = new TimeSpan((int)productType.ExpiresAfterHours, 0, 0);

            int addHours = (int)ticketExpiresIn.TotalHours;

            DateTime ticketExpiresDate = DateTime.Now;

            ticketExpiresDate = ticketExpiresDate.AddHours(addHours);
            ticketExpiresDate = new DateTime(ticketExpiresDate.Year,
                ticketExpiresDate.Month,
                ticketExpiresDate.Day,
                ticketExpiresDate.Hour,
                0,
                1);

            SoldTicket soldTicket = new SoldTicket()
            {
                Id = Guid.NewGuid(),
                DateOfPurchase = DateTime.Now,
                Expires = ticketExpiresDate,
                UserId = "unregistred_users",
                Price = soldAtPrice,
                Usages = 0,
                Type = productType.Name
            };

            unitOfWork.SoldTickets.Add(soldTicket);
            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoldTicketExists(soldTicket.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(soldTicket);


        }


        [Route("api/SoldTickets/Buy/{productTypeId}")]
        [HttpPost]
        [ResponseType(typeof(SoldTicket))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult BuyTicket(Guid productTypeId) {
            var userId = User.Identity.GetUserId();

            var productType = unitOfWork.ProductTypes.Get(productTypeId);

            if (productType == null) {
                return BadRequest("Proizvod ne postoji");
            }

            var userFromDb = unitOfWork.Users.Get(userId);

            if (userFromDb == null) {
                return InternalServerError();
            } else if (userFromDb.Status != "verified") {
                return BadRequest("Korisnik nije verifikovan");
            }


            if (userFromDb.Type == null || userFromDb.Type.Trim().Length == 0) {
                return InternalServerError();
            }

            var activePricelist = unitOfWork.Pricelists.Find(x => x.From <= DateTime.Now && x.To >= DateTime.Now).FirstOrDefault();

            if (activePricelist == null) {
                return BadRequest("Nema aktivnih cenovnika");
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
            TimeSpan ticketExpiresIn = new TimeSpan((int)productType.ExpiresAfterHours, 0, 0);
            

            int addMonths = (int)Math.Floor(ticketExpiresIn.TotalDays / 30.0);
            int addDays = (int)ticketExpiresIn.TotalDays;
            int addHours = (int)ticketExpiresIn.TotalHours;

            DateTime ticketExpiresDate = DateTime.Now;
            
            if (addMonths >= 12) //godisnja
            {
                if (DateTime.Now.DayOfYear > 345) //pred kraj godine moze da se kupi godisnja za sledecu godinu
                {
                    ticketExpiresDate = new DateTime(DateTime.Now.Year + 1, 12, 31, 23, 59, 59);
                } else
                {
                    ticketExpiresDate = new DateTime(DateTime.Now.Year, 12, 31, 23, 59, 59);
                }
            }
            else if (addMonths >= 1)
            {
                //reset dane, sate minute da budu prvi dan i prvi minut u mesecu
                //12. jun 2019. + 3 meseca => karta istice: 1. septembra 2019. 00H00M
                ticketExpiresDate = ticketExpiresDate.AddMonths(addMonths);
                ticketExpiresDate = new DateTime(ticketExpiresDate.Year, 
                    ticketExpiresDate.Month, 
                    1, 
                    0, 
                    0, 
                    0);
            } else if (addMonths == 0 && addDays >= 1)
            {
                ticketExpiresDate = ticketExpiresDate.AddDays(addDays);
                ticketExpiresDate = new DateTime(ticketExpiresDate.Year, 
                    ticketExpiresDate.Month, 
                    ticketExpiresDate.Day, 
                    0, 
                    0, 
                    0);
            } else if (addMonths == 0 && addDays == 0 && addHours > 0)
            {
                ticketExpiresDate = ticketExpiresDate.AddHours(addHours);
                ticketExpiresDate = new DateTime(ticketExpiresDate.Year, 
                    ticketExpiresDate.Month, 
                    ticketExpiresDate.Day, 
                    ticketExpiresDate.Hour, 
                    0, 
                    1);
            }
            
            SoldTicket soldTicket = new SoldTicket() {
                Id = Guid.NewGuid(),
                DateOfPurchase = DateTime.Now,
                Expires = ticketExpiresDate,
                UserId = userId,
                Price = soldAtPrice,
                Usages = 0,
                Type = productType.Name
            };

            unitOfWork.SoldTickets.Add(soldTicket);
            try {
                unitOfWork.Complete();
            } catch (DbUpdateConcurrencyException) {
                if (!SoldTicketExists(soldTicket.Id)) {
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