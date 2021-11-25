using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Models
{
    public class Customer
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            this.RentCars = new HashSet<RentCar>();
        }

        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public System.DateTime BirtheDate { get; set; }
        public string City { get; set; }
        public decimal Poste_Code { get; set; }
        public System.DateTime BecoamingDriverDate { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int NumberOfRentedCar { get; set; }
        public int NumberOfOverallRentedCar { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RentCar> RentCars { get; set; }
    }
}
