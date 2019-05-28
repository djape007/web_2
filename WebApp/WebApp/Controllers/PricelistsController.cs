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
    public class PricelistsController : ApiController
    {
        IUnitOfWork unitOfWork;

        public PricelistsController(IUnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Pricelists
        public IEnumerable<Pricelist> GetPricelists()
        {
            return unitOfWork.Pricelists.GetAll();
        }

        // GET: api/Pricelists/5
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult GetPricelist(Guid id)
        {
            Pricelist pricelist = unitOfWork.Pricelists.Find(x => x.Id == id).FirstOrDefault();
            if (pricelist == null)
            {
                return NotFound();
            }

            return Ok(pricelist);
        }

        // PUT: api/Pricelists/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPricelist(Guid id, Pricelist pricelist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pricelist.Id)
            {
                return BadRequest();
            }

            unitOfWork.Pricelists.Update(pricelist);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PricelistExists(id))
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

        // POST: api/Pricelists
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult PostPricelist(Pricelist pricelist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Pricelists.Add(pricelist);

            try
            {
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (PricelistExists(pricelist.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = pricelist.Id }, pricelist);
        }

        // DELETE: api/Pricelists/5
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult DeletePricelist(Guid id)
        {
            Pricelist pricelist = unitOfWork.Pricelists.Find(x => x.Id == id).FirstOrDefault();
            if (pricelist == null)
            {
                return NotFound();
            }

            unitOfWork.Pricelists.Remove(pricelist);
            unitOfWork.Complete();

            return Ok(pricelist);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PricelistExists(Guid id)
        {
            return unitOfWork.Pricelists.Find(e => e.Id == id).Count() > 0;
        }
    }
}