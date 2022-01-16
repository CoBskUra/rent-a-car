using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
//using NETCore.MailKit.Core;
using Rent_a_Car.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Rent_a_Car.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        //private readonly IEmailService _emailService;

        public HomeController(UserManager<ApplicationUser> userManager, ILogger<HomeController> logger, 
            SignInManager<ApplicationUser> signInManager)//, IEmailService emailService)
        {
            _logger = logger;
            _userManager = userManager; // it manages user information
            _signInManager = signInManager;
            //_emailService = emailService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [Authorize]
        public IActionResult Secret() // nie dodawać do _Layout!
        {
            return View();
        }

        /*public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password) // functionality
        {
            var user = _userManager.FindByNameAsync(username);
            if (user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(username, password, false, false);
                if (signInResult.Succeeded)
                {
                    return RedirectToAction("Index");
                }
            }

            return RedirectToAction("Index");
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(string username, string password) // functionality create a user
        {
            var user = new ApplicationUser
            {
                UserName = username,
                Email = ""
            };
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var link = Url.Action(nameof(VerifyEmail), "Home", new { userId = user.Id, code }, Request.Scheme, Request.Host.ToString());

                await _emailService.SendAsync("test@test.com", "email verify", $"<a href=\"{link}\">Verify</a>", true);

                return RedirectToAction("EmailVerification");
            }

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }

        public IActionResult EmailVerification() => View();

        public async Task<IActionResult> VerifyEmail(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return BadRequest();

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
                return View();

            return BadRequest();
        }*/
    }
}