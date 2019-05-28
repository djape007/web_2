using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        public void Add(ProductType entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<ProductType> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProductType> Find(Expression<Func<ProductType, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public ProductType Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProductType> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(ProductType entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<ProductType> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(ProductType entity)
        {
            throw new NotImplementedException();
        }
    }
}