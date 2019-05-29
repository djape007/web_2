using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, Guid>, ILineRepository
    {
        public LineRepository(DbContext context) : base(context)
        {
        }

        new public IEnumerable<Line> GetAll()
        {
            return context.Set<Line>().Include("Buses").Include("BusStopsOnLines").Include("PointLinePaths").ToList();
        }

        new public Line Get(Guid id)
        {
            return context.Set<Line>().Include("Buses").Include("BusStopsOnLines").Include("PointLinePaths").FirstOrDefault(x => x.Id == id);
        }
    }
}