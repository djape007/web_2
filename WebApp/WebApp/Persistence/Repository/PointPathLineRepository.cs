using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Persistence.Repository
{
    public class PointPathLineRepository : Repository<Models.PointPathLine, Guid>, IPointPathLineRepository
    {
        public PointPathLineRepository(DbContext context) : base(context)
        {
        }
    }
}