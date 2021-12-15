using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Data
{
    public class ApplicationDbContext:  DbContext // IdentityDbContext?
    {
        public ApplicationDbContext( DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }


        public DbSet<Car> Car { get; set; }
        public DbSet<CarDetalis> CarDetalis { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Employer> Employer { get; set; }
        public DbSet<RentCar> RentCar { get; set; }
        public DbSet<ReturnFile> ReturnFile { get; set; }

    }
}
