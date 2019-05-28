using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Persistence.Repository
{
    public class SoldTicketRepository : Repository<Models.SoldTicket, Guid>, ISoldTicketRepository
    {
        public SoldTicketRepository(DbContext context) : base(context)
        {
        }
    }
}