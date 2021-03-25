using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMDT.Models
{
    public class Role
    {
        [Key]
        [Required]
        public string RoleId { get; set; }
        [Required]
        public string Name { get; set; }

        //----
        public ICollection<Account> Account { get; set; }
    }
}
