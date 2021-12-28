using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Data
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public ApplicationDbContext( DbContextOptions<ApplicationDbContext> options):base(options)
        {
        }
        public DbSet<Car> Car { get; set; }
        public DbSet<CarDetails> CarDetails { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Employer> Employer { get; set; }
        public DbSet<RentCarEvent> RentCar { get; set; }
        public DbSet<ReturnFile> ReturnFile { get; set; }


    }
}
