using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class OrderDetail
    {
        [Key]
        [Required]
        public string OrderDetailId { get; set; }
        [Required]
        public string Quantity { get; set; }
        [Required]
        public string TotalPrice { get; set; }

        //Foreign key----
        [Required]
        public string OrderId { get; set; }
        [Required]
        public string ProductId { get; set; }
    }
}
