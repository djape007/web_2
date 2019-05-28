using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class SoldTicket
    {
        public Guid Id { set; get; }
        public string Type { set; get; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public DateTime Expires { get; set; }
        public int Usages { get; set; } = 0;
        public Double Price { get; set; }
        public DateTime DateOfPurchase { get; set; }

    }
}