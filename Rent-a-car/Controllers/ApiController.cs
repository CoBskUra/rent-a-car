using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Data;
using Rent_a_Car.Models;

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
        [Route("Cars")]
        public IEnumerable<Car> Get()
        {
            var rng = new Random();
            return _context.Car.ToList();
        }


    }
}
