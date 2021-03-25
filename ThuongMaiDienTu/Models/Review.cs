using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Review
    {
        [Key]
        [Required]
        public string ReviewId { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public int Rating { get; set; }

        //Foreign key----
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public string ProductId { get; set; }
    }
}
