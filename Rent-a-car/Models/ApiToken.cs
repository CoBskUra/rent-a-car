using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace Rent_a_Car.Models
{
    public class ApiToken
    {
        public ApiToken()
        {

        }
        public int TokenID { get; set; }
        public string Token { get; set; }

        public bool Active { get; set; } = true;
    }
}
