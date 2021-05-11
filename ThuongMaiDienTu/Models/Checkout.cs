using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMDT.Models;

namespace ThuongMaiDienTu.Models
{
    public class Checkout
    {
        public Order Order { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
