using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TMDT.Data;
using TMDT.Models;

namespace TMDT.Controllers
{
    [Authorize(Roles = "admin")]
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
            List<Account> accounts = context.Accounts.ToList().FindAll(acc => acc.Status != "-1");
            return accounts;
        }
        [HttpGet("{id}")]
        public Account GetById(string id)
        {
            Account account = context.Accounts.Find(id);
            if(account != null && account.Status != "-1")
            {
                return account;
            }
            return null;
        }
        [HttpPost]
        public HttpResponseMessage Add(Account account)
        {
            Account account1 = context.Accounts.Find(account.AccountId);
            if (account1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Duplicate primary key";*/
            }
            Role role = context.Roles.Find(account.RoleId);
            if(role == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "RoleId does not exist";*/
            }

            context.Accounts.Add(account);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        public HttpResponseMessage Update(Account account)
        {
            Account account1 = context.Accounts.Find(account.AccountId);
            if (account1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Update not found";*/
            }
            Role role = context.Roles.Find(account.RoleId);
            if (role == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "RoleId does not exist";*/
            }

            context.Entry(account1).State = EntityState.Detached;
            context.Entry(account).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Account account = context.Accounts.Find(id);
            if (account == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Delete not found";*/
            }
            Customer customer = context.Customers.ToList().Find(x => x.AccountId == id);
            if (customer != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Delete foreign key first (Customer)";*/
            }
            context.Entry(account).State = EntityState.Deleted;
            context.SaveChanges();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
