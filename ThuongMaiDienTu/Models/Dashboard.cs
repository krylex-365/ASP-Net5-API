using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMDT.Models;

namespace ThuongMaiDienTu.Models
{
    public class Dashboard
    {
        public string OrderId { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public DateTime BuyDate { get; set; }
        public string Status { get; set; }
        public OrderDetail OrderDetail { get; set; }
    }
}
