using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Coefficient
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public Double Value { get; set; }
    }
}