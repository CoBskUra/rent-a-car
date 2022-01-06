using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Data;
using Rent_a_Car.MessegeForCustomer;
using Rent_a_Car.Models;

namespace Rent_a_Car.Controllers
{
    public class JsonCarsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public JsonCarsController(ApplicationDbContext context)
        {
            _context = context;
            Data.DatabaseFiller.FillDataIfEmpty(context);
        }

        // GET: Cars
        public async Task<JsonResult> Index(string sortOrder)
        {
            var dbContext = _context.Car.OrderBy(c => c.Brand).ThenBy(c => c.Model);

            return  new JsonResult(dbContext);
        }

        // GET: Cars/Details/5
        public async Task<JsonResult> Details(int? id)
        {
            if (id == null)
            {
                return new JsonResult("Server otrzymał pustą wiadomość");
            }

            MessengeCompaniesWithRequariedCar requestInfo =  new MessengeCompaniesWithRequariedCar();
            await requestInfo.InitializeAsync(_context, (int) id);

            return new JsonResult(requestInfo);
        }

        

        // POST: Cars/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<JsonResult> Edit([FromBody] Car car)
        {
            if (car == null)
                throw new Exception("server recived empty messange");

            if (!CarExists(car.CarID))
            {
                return new JsonResult($"Nie znaleziono auta o id: {car.CarID} które chcesz zmienić ");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(car);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CarExists(car.CarID))
                    {
                        return new JsonResult($"Nie znaleziono auta o id: {car.CarID} które chcesz zmienić");
                    }
                    else
                    {
                        throw;
                    }
                }
                return new JsonResult("Pomyślnie edytowano");
            }
            return new JsonResult("Wprowadzono niepoprany format danych");
        }

        private bool CarExists(int id)
        {
            return _context.Car.Any(e => e.CarID == id);
        }

        //// GET: Cars/ShowSearchResult
        //public async Task<IActionResult> ShowSearchResult(String Brand, String Model)
        //{
        //    var dbContext = _context.Car;

        //    if (Brand != null && Model != null)
        //    {
        //        return View("Index",
        //            await dbContext.Where(x => x.Brand.Equals(Brand)).
        //            Where(x => x.Model.Equals(Model)).ToListAsync());
        //    }
        //    else if (Brand != null)
        //    {
        //        return View("Index",
        //            await dbContext.Where(x => x.Brand.Equals(Brand)).ToListAsync());
        //    }
        //    else if (Model != null)
        //    {
        //        return View("Index",
        //            await dbContext.Where(x => x.Model.Equals(Model)).ToListAsync());
        //    }
        //    else
        //        return View("Index", await dbContext.ToListAsync());
        //}
    }
}
