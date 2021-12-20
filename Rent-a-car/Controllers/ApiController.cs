using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Data;
using Rent_a_Car.Models;
using Rent_a_Car.ApiClasses;

namespace Rent_a_Car.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("CarModels")]
        public IEnumerable<Car> Get()
        {
            return _context.Car.ToList();
        }

        [HttpGet]
        [Route("Car/{carModelID}")]
        public ActionResult Get([FromRoute] int carModelID)
        {
            try
            {
                return new JsonResult(_context.CarDetails.Select(c => c).Where(c=> c.CarID == carModelID));
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("Rent/{carDetailsID}")]
        public ActionResult Rent(int carDetailsID)
        {
            var carToRent = _context.CarDetails.SingleOrDefault(c => c.CarDetailsID == carDetailsID);
            if (carToRent == null)
            {
                return NotFound();
            }
            if (!carToRent.IsAvailable)
            {
                return BadRequest();
            }
            var rentedCarData = RentController.RentACar(_context, carDetailsID, 1);
            if (rentedCarData == null) return NotFound();

            var result = new JsonResult(rentedCarData);
            result.StatusCode = 200;
            return result;
        }

        [HttpPost]
        [Route("Return/{rentalID}")]
        public ActionResult ReturnCar([FromRoute] int rentalID)
        {
            return NotFound();
        }

    }
}
