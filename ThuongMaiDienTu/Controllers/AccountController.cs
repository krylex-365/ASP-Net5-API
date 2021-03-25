using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMDT.Data;
using TMDT.Models;

namespace TMDT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ECContext context;
        public AccountController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Account> GetList()
        {
            return context.Accounts.ToList();
        }
        [HttpGet("{id}")]
        public Account GetById(string id)
        {
            return context.Accounts.Find(id);
        }
        [HttpPost]
        public string Add(Account account)
        {
            Account account1 = context.Accounts.Find(account.AccountId);
            if (account1 != null)
            {
                return "Duplicate primary key";
            }
            Role role = context.Roles.Find(account.RoleId);
            if(role == null)
            {
                return "RoleId does not exist";
            }

            context.Accounts.Add(account);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Account account)
        {
            Account account1 = context.Accounts.Find(account.AccountId);
            if (account1 == null)
            {
                return "Update not found";
            }
            Role role = context.Roles.Find(account.RoleId);
            if (role == null)
            {
                return "RoleId does not exist";
            }

            context.Entry(account1).State = EntityState.Detached;
            context.Entry(account).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Account account = context.Accounts.Find(id);
            if (account == null)
            {
                return "Delete not found";
            }
            Customer customer = context.Customers.ToList().Find(x => x.AccountId == id);
            if (customer != null)
            {
                return "Delete foreign key first (Customer)";
            }
            context.Entry(account).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
