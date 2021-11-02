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
            this.ReantCars = new HashSet<ReantCar>();
        }

        [Key]
        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public DateTime BirtheDate { get; set; }
        public string location { get; set; }
        public DateTime BecomingDriverDate { get; set; }
        public string Login { get; set; }
        private string Password { get; set; }
        public int NumberOfRentrdCar { get; set; }
        public int NumberOfOverallRentrdCar { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ReantCar> ReantCars { get; set; }
    }
}
