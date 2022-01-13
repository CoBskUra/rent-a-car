using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car.Messenge.FromCustomer
{
    public enum order
    {
        
        Brand,
        Mark
    }

    public class SerchOption
    {
        public string Mark;
        public string Brand;
        public order order;
    }
}
