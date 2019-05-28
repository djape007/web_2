using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class BusRepository : IBusRepository
    {
        public void Add(Bus entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Bus> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Bus> Find(Expression<Func<Bus, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Bus Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Bus> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Bus entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Bus> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(Bus entity)
        {
            throw new NotImplementedException();
        }
    }
}