using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Models
{
    public partial class Car
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Car()
        {
            this.CarDetalis = new HashSet<CarDetali>();
        }

        public int CarID { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int HorsePower { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CarDetali> CarDetalis { get; set; }
    }
}
