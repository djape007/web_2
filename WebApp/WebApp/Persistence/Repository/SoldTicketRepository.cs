using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class SoldTicketRepository : Repository<Models.SoldTicket, Guid>, ISoldTicketRepository
    {
        public SoldTicketRepository(DbContext context) : base(context)
        {
        }

        new public IEnumerable<SoldTicket> GetAll()
        {
            return context.Set<SoldTicket>().Include("User").ToList();
        }

        new public SoldTicket Get(Guid id)
        {
            return context.Set<SoldTicket>().Include("User").FirstOrDefault(x => x.Id == id);
        }
    }
}