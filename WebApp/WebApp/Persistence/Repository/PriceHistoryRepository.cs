using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PriceHistoryRepository : Repository<PriceHistory, Guid>, IPriceHistoryRepository
    {
        public PriceHistoryRepository(DbContext context) : base(context)
        {
        }
    }
}