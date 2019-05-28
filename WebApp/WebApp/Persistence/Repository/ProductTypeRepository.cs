using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ProductTypeRepository : Repository<ProductType, Guid>, IProductTypeRepository
    {
        public ProductTypeRepository(DbContext context) : base(context)
        {
        }
    }
}