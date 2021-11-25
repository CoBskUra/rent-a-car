using System.Collections.Generic;

namespace Rent_a_Car.Models
{
    public class CarDetalis
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CarDetalis()
        {
            this.RentCars = new HashSet<RentCar>();
        }

        public int CarDetalisID { get; set; }
        public int CarID { get; set; }
        public int CompanyID { get; set; }
        public decimal Price { get; set; }
        public System.DateTime YearOfProduction { get; set; }
        public string Description { get; set; }
        public bool isAvailable { get; set; }

        public virtual Car Car { get; set; }
        public virtual Company Company { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RentCar> RentCars { get; set; }
    }
}