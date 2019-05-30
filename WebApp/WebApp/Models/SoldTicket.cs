using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class SoldTicket
    {
        [Key]
        public Guid Id { set; get; }
        [Required]
        public string Type { set; get; }
        [Required]
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime Expires { get; set; }
        public int Usages { get; set; } = 0;
        public Double Price { get; set; }
        [Required]
        public DateTime DateOfPurchase { get; set; }
    }
}