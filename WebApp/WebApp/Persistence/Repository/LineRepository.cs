using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : ILineRepository
    {
        public void Add(Line entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Line> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Line> Find(Expression<Func<Line, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Line Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Line> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Line entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Line> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(Line entity)
        {
            throw new NotImplementedException();
        }
    }
}