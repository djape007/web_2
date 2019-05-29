using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public bool HasDocument { get; set; }
        public string Files { get; set; }
        public ICollection<SoldTicket> SoldTickets { get; set; }
    }
}