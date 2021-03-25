using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Account
    {
        [Key]
        [Required]
        public string AccountId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Avatar { get; set; }

        //Foreign key----
        [Required]
        public string RoleId { get; set; }

        //----
        public ICollection<Customer> Customer { get; set; }
    }
}
