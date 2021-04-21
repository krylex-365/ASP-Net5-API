using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Category
    {
        [Key]
        [Required]
        public string CategoryId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Status { get; set; }

        //----
        public ICollection<Subcategory> Subcategory { get; set; }
    }
}
