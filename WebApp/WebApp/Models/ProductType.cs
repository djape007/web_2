using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class ProductType
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<PriceHistory> PriceHistories { get; set; }

    }
}