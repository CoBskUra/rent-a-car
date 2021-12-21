using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rent_a_Car.Models;
namespace Rent_a_Car.Controllers
{
    public class RegisterController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public RegisterController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Register(string returnUrl)
        {
            return View(new RegisterModelView { ReturnUrl = "/Home" });
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterModelView vm)
        {
            // password and username do not get passed
            // idk why

            var result = await _userManager.CreateAsync(new IdentityUser(vm.userName), vm.password); // persistent cookie - stays in the browser after closing
            if (result.Succeeded)
            {
                return Redirect(vm.ReturnUrl);
            }
            

            return View();
        }
    }
}
