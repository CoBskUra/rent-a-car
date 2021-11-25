using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Models
{
    public partial class RentCar
    {
        public int RentCarID { get; set; }
        public System.DateTime SubmitDate { get; set; }
        public System.DateTime ExeptedReturnDate { get; set; }
        public int CustomerID { get; set; }
        public int CarDetalisID { get; set; }
        public bool isReturn { get; set; }

        public virtual CarDetalis CarDetalis { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ReturnFile ReturnFile { get; set; }
    }
}
