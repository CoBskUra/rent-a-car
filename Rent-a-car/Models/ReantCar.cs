using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Models
{
    public class ReantCar
    {
        [Key]
        public int OrderID { get; set; }
        public DateTime SubmitDate { get; set; }
        public DateTime ExeptedReturnDate { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual CarDetalis CarDetalis { get; set; }
        public virtual Nullable<ReturnFile> ReturnFile { get; set; }
    }
}
