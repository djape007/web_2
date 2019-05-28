using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Timetable
    {
        [Key]
        public Guid Id { get; set; }
        public string TimesDirectionA { get; set; }
        public string TimesDirectionB { get; set; }
        public DateTime ValidFrom { get; set; }
        public Line Line { get; set; }

    }
}