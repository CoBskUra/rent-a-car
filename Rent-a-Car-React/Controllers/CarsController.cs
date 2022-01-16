using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car_React.Data;
using Rent_a_Car_React.Models;

namespace Rent_a_Car.Controllers
{
    [Route("carsOld")]
    public class CarsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CarsController(ApplicationDbContext context)
        {
            _context = context;
            DatabaseFiller.FillDataIfEmpty(context);
        }

        // GET: Cars
        public async Task<IActionResult> Index(string sortOrder)
        {
            var dbContext = _context.Car.OrderBy(c => c.Brand).ThenBy(c => c.Model);

            return View(await dbContext.ToListAsync());
        }

        // GET: Cars/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var car = await _context.Car
                .FirstOrDefaultAsync(m => m.CarID == id);
            if (car == null)
            {
                return NotFound();
            }

            return RedirectToAction("ShowAllCars", "CarDetails", new { id = id });
        }

        // GET: Cars/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var car = await _context.Car.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            return View(car);
        }

        // POST: Cars/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CarID,Brand,Model,HorsePower")] Car car)
        {
            if (id != car.CarID)
            {
                return NotFound();
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
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(car);
        }

        private bool CarExists(int id)
        {
            return _context.Car.Any(e => e.CarID == id);
        }

        // GET: Cars/ShowSearchResult
        public async Task<IActionResult> ShowSearchResult(String Brand, String Model)
        {
            var dbContext = _context.Car;

            if (Brand != null && Model != null)
            {
                return View("Index",
                    await dbContext.Where(x => x.Brand.Equals(Brand)).
                    Where(x => x.Model.Equals(Model)).ToListAsync());
            }
            else if (Brand != null)
            {
                return View("Index",
                    await dbContext.Where(x => x.Brand.Equals(Brand)).ToListAsync());
            }
            else if (Model != null)
            {
                return View("Index",
                    await dbContext.Where(x => x.Model.Equals(Model)).ToListAsync());
            }
            else
                return View("Index", await dbContext.ToListAsync());
        }
    }
}
