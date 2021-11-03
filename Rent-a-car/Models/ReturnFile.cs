using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Models
{
    public partial class ReturnFile
    {
        public int RentCarID { get; set; }
        public System.DateTime ReturnDate { get; set; }
        public string CarConditon { get; set; }
        public int OdometerReading { get; set; }
        public byte[] Photo { get; set; }
        public byte[] ReturnProocol { get; set; }
        public Nullable<int> EmployerID { get; set; }

        public virtual Employer Employer { get; set; }
        public virtual RentCar RentCar { get; set; }
    }
}
