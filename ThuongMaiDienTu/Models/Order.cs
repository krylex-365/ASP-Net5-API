using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Order
    {
        [Key]
        [Required]
        public string OrderId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Note { get; set; }
        [Required]
        public string Payment { get; set; }
        [Required]
        public string Status { get; set; }

        //Foreign key----
        [Required]
        public string CustomerId { get; set; }
        
        //----
        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
