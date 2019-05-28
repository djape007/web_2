using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        [Key]
        public Guid Id { get; set; }
        public string LineCode { get; set; }
        public string DirectionA { get; set; }
        public string DirectionB { get; set; }
        public ICollection<Bus> Buses { get; set; }
    }
}