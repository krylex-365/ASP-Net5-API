using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Product
    {
        [Key]
        [Required]
        public string ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Sale { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Quantity { get; set; }

        //Foreign key----
        [Required]
        public string SubcategoryId { get; set; }

        //----
        public ICollection<Review> Review { get; set; }
        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
