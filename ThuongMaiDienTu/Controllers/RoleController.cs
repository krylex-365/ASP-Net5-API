using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using TMDT.Data;
using TMDT.Models;

namespace TMDT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly ECContext context;
        private readonly ILogger<RoleController> logger;
        public RoleController(ILogger<RoleController> logger, ECContext context)
        {
            this.logger = logger;
            this.context = context;
        }
        [HttpGet]
        public List<Role> GetList()
        {
            return context.Roles.ToList();
        }
        [HttpGet("{id}")]
        public Role GetById(string id)
        {
            return context.Roles.Find(id);
        }
        [HttpPost]
        public string Add(Role role)
        {
            Role role1 = context.Roles.Find(role.RoleId);
            if (role1 != null)
            {
                return "Duplicate primary key";
            }

            context.Roles.Add(role);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Role role)
        {
            Role role1 = context.Roles.Find(role.RoleId);
            if (role1 == null)
            {
                return "Update not found";
            }

            context.Entry(role1).State = EntityState.Detached;
            context.Entry(role).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Role role1 = context.Roles.Find(id);
            if(role1 == null)
            {
                return "Delete not found";
            }
            Account account = context.Accounts.ToList().Find(x => x.RoleId == id);
            if (account != null)
            {
                return "Delete foreign key first";
            }
            context.Entry(role1).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
