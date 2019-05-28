using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PriceHistoryRepository : IPriceHistoryRepository
    {
        public void Add(PriceHistory entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<PriceHistory> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PriceHistory> Find(Expression<Func<PriceHistory, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public PriceHistory Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PriceHistory> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(PriceHistory entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<PriceHistory> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(PriceHistory entity)
        {
            throw new NotImplementedException();
        }
    }
}