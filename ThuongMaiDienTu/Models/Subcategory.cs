using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Subcategory
    {
        [Key]
        [Required]
        public string SubcategoryId { get; set; }
        [Required]
        public string Name { get; set; }

        //Foreign key----
        [Required]
        public string CategoryId { get; set; }

        //----
        public ICollection<Product> Product { get; set; }
    }
}
