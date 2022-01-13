using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Data;
using Rent_a_Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.MessegeForCustomer
{
    

    public class MessengeCompaniesWithRequariedCar
    {
        public Car Car { get; set; }
        public List<Company> Companies;

        public async Task InitializeAsync(ApplicationDbContext dbContext, int CarID)
        {
            var car = dbContext.Car
                .FirstOrDefaultAsync(m => m.CarID == CarID);
            if (car.Result == null)
            {
                throw new Exception("Car don't exsist");
            }
            
            var cardetalis = dbContext.CarDetails.Where(cd => cd.CarID == CarID);
            var companies = await cardetalis.Select(cd => cd.Company).Distinct().ToListAsync();

            this.Car = car.Result;
            this.Companies = companies;
        }

    }
}
