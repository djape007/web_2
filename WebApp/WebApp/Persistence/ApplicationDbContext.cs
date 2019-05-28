using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Pricelist> Pricelists { get; set; }
        public DbSet<PriceHistory> PriceHistories { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Timetable> Timetables { get; set; }


        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }


    }
}