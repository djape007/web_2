using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TimeTableRepository : ITimeTableRepository
    {
        public void Add(Timetable entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Timetable> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Timetable> Find(Expression<Func<Timetable, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Timetable Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Timetable> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Timetable entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Timetable> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(Timetable entity)
        {
            throw new NotImplementedException();
        }
    }
}