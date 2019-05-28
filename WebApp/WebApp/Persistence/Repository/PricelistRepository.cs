using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistRepository : IPricelistRepository
    {
        public void Add(Pricelist entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Pricelist> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Pricelist> Find(Expression<Func<Pricelist, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Pricelist Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Pricelist> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Pricelist entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Pricelist> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(Pricelist entity)
        {
            throw new NotImplementedException();
        }
    }
}