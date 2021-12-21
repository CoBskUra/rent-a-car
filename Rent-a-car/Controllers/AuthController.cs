using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Controllers
{
    public class AuthController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl)
        {
            return View(new LoginViewModel { ReturnUrl = returnUrl});
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel vm)
        {
            // password and username do not get passed
            // idk why

            var result = await _signInManager.PasswordSignInAsync(vm.userName, vm.password, false, false); // persistent cookie - stays in the browser after closing

            if(result.Succeeded)
            {
                return Redirect(vm.ReturnUrl);
            }   
            else if(result.IsLockedOut) // for example, we do email recovery
            {

            }

            return View();
        }

        
    }
}
