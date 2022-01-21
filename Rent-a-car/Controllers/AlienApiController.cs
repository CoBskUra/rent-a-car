using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rent_a_Car.ApiClasses;
using Rent_a_Car.ApiClasses.NewFolder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Rent_a_Car.Controllers
{
    [Route("[controller]")]
    //[Authorize]
    public class AlienApiController : ControllerBase
    {

        [HttpGet]
        [AllowAnonymous]
        [Route("Get")]
        public JsonResult Get()
        {
            Vehicles vehicles = new Vehicles();
            string respond = ComunicateWithAlliens.CallToAllien("https://mini.rentcar.api.snet.com.pl/vehicles").Result;
            vehicles = JsonConvert.DeserializeObject<Vehicles>(respond);
            
            
            return new JsonResult(vehicles);
        }

    }
}
