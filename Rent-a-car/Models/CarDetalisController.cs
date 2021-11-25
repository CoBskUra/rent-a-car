using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Rent_a_Car.Data;

namespace Rent_a_Car.Models
{
    public class CarDetalisController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CarDetalisController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CarDetalis/0
        public async Task<IActionResult> Index(string sortOrder)
        {
            var applicationDbContext = _context.CarDetalis.Include(c => c.Car).Include(c => c.Company);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: CarDetalis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var carDetalis = await _context.CarDetalis
                .Include(c => c.Car)
                .Include(c => c.Company)
                .FirstOrDefaultAsync(m => m.CarDetalisID == id);
            if (carDetalis == null)
            {
                return NotFound();
            }

            return View(carDetalis);
        }


        // GET: CarDetalis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var carDetalis = await _context.CarDetalis.FindAsync(id);
            if (carDetalis == null)
            {
                return NotFound();
            }
            ViewData["CarID"] = new SelectList(_context.Car, "CarID", "CarID", carDetalis.CarID);
            ViewData["CompanyID"] = new SelectList(_context.Company, "CompanyID", "CompanyID", carDetalis.CompanyID);
            return View(carDetalis);
        }

        // POST: CarDetalis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CarDetalisID,CarID,CompanyID,Price,YearOfProduction,Description,isAvailable")] CarDetalis carDetalis)
        {
            if (id != carDetalis.CarDetalisID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(carDetalis);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CarDetalisExists(carDetalis.CarDetalisID))
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
            ViewData["CarID"] = new SelectList(_context.Car, "CarID", "CarID", carDetalis.CarID);
            ViewData["CompanyID"] = new SelectList(_context.Company, "CompanyID", "CompanyID", carDetalis.CompanyID);
            return View(carDetalis);
        }

        private bool CarDetalisExists(int id)
        {
            return _context.CarDetalis.Any(e => e.CarDetalisID == id);
        }

        // GET: CarDetalis/ShowAllCars
        //[HttpPost]
        public async Task<IActionResult> ShowAllCars(int? id)
        {
            var dbContext = _context.CarDetalis.Include(c => c.Car).Include(c => c.Company);

            if (id == null)
            {
                return NotFound();
            }
            return View("Index",
                await dbContext.Where(x => x.CarID.Equals(id)).ToListAsync());
        }
    }
}
