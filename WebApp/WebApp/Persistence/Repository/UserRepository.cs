using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<Models.User, Guid>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }
    }
}