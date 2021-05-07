using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ThuongMaiDienTu.Models
{
    public class Card
    {
        [Key]
        [Required]
        public string CardId { get; set; }
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public string ProductId { get; set; }
    }
}
