using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class PriceHistory
    {
        public Guid PricelistId { get; set; }

        public Guid ProductTypeId { get; set; }

        public Double Price { get; set; }
    }
}