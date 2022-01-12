﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Rent_a_Car
{
    public class LoginViewModel //Customer??
    {   
        [Required]
        [Display(Name = "Login")]
        public string userName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string password { get; set; }
        public string ReturnUrl { get; set; }
    }
}