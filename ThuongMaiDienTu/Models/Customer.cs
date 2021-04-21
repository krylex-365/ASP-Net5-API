using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Customer
    {
        [Key]
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Mail { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string Sex { get; set; }
        public string Status { get; set; }

        //Foreign key----
        [Required]
        public string AccountId { get; set; }

        //----
        public ICollection<Review> Review { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
