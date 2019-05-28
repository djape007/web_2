using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class BusStopsOnLine
    {
        [Key, Column(Order =0)]
        public Guid BusStopId { get; set; }
        public BusStop BusStop { get; set; }
        [Key, Column(Order = 1)]
        public Guid LineId { get; set; }
        public Line Line { get; set; }
    }
}