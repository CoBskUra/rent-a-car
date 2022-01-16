﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Rent_a_Car_React.Models
{
    [Index(nameof(Customer.Email), IsUnique = true)]
    public class Customer
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            this.RentCars = new HashSet<RentCarEvent>();
        }

        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public System.DateTime BirtheDate { get; set; }
        public string City { get; set; }

        public string Poste_Code { get; set; }
        public System.DateTime BecoamingDriverDate { get; set; }
        public int NumberOfRentedCar { get; set; }
        public int NumberOfOverallRentedCar { get; set; }

        public string AspNetUserID { get; set; }
        
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RentCarEvent> RentCars { get; set; }
        
    }
}
