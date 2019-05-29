using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<Models.User, Guid>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        new public IEnumerable<User> GetAll()
        {
            return context.Set<User>().Include("SoldTickets").ToList();
        }

        new public User Get(Guid id)
        {
            return context.Set<User>().Include("SoldTickets").FirstOrDefault(x => x.Id == id);
        }
    }
}