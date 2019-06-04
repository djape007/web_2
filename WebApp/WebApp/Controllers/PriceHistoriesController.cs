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
    public class PriceHistoriesController : ApiController
    {
        private IUnitOfWork unitOfWork;

        public PriceHistoriesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [Route("api/PriceHistories/Current")]
        [HttpGet]
        [ResponseType(typeof(ICollection<PriceHistory>))]
        public IEnumerable<PriceHistory> GetCurrentPriceHistories()
        {
            return unitOfWork.PriceHistories.GetAll().Where(x => x.Pricelist.From < DateTime.Now && x.Pricelist.To > DateTime.Now);
        }
        // GET: api/PriceHistories
        public IEnumerable<PriceHistory> GetPriceHistories()
        {
            return unitOfWork.PriceHistories.GetAll();
        }

        // GET: api/PriceHistories/5
        [ResponseType(typeof(PriceHistory))]
        public IHttpActionResult GetPriceHistory(Guid id)
        {
            PriceHistory priceHistory = unitOfWork.PriceHistories.Get(id);
            if (priceHistory == null)
            {
                return NotFound();
            }

            return Ok(priceHistory);
        }

        // PUT: api/PriceHistories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPriceHistory(Guid id, PriceHistory priceHistory)
        {
            if (!ModelState.IsValid || priceHistory == null)
            {
                return BadRequest(ModelState);
            }

            if (id != priceHistory.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.PriceHistories.Update(priceHistory);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceHistoryExists(id))
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

        // POST: api/PriceHistories
        [ResponseType(typeof(PriceHistory))]
        public IHttpActionResult PostPriceHistory(PriceHistory priceHistory)
        {
            if (!ModelState.IsValid || priceHistory == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                unitOfWork.PriceHistories.Add(priceHistory);
                unitOfWork.Complete();
            }
            catch (DbUpdateException)
            {
                if (PriceHistoryExists(priceHistory.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = priceHistory.Id }, priceHistory);
        }

        // DELETE: api/PriceHistories/5
        [ResponseType(typeof(PriceHistory))]
        public IHttpActionResult DeletePriceHistory(Guid id)
        {
            PriceHistory priceHistory = unitOfWork.PriceHistories.Get(id);
            if (priceHistory == null)
            {
                return NotFound();
            }

            unitOfWork.PriceHistories.Remove(priceHistory);
            unitOfWork.Complete();

            return Ok(priceHistory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PriceHistoryExists(Guid id)
        {
            return unitOfWork.PriceHistories.Find(e => e.Id == id).Count() > 0;
        }
    }
}