using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Persistence.Repository
{
    public class BusStopsOnLineRepository : Repository<Models.BusStopsOnLine, Guid>, IBusStopsOnLineRepository
    {
        public BusStopsOnLineRepository(DbContext context) : base(context)
        {
        }
    }
}