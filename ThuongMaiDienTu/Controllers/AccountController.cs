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
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ECContext context;
        public AccountController(ECContext context)
        {
            this.context = context;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public List<Account> GetList()
        {
            List<Account> accounts = context.Accounts.ToList().FindAll(acc => acc.Status != "-1");
            return accounts;
        }
        [Authorize]
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
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Add(Account account)
        {
            Role role = context.Roles.Find(account.RoleId);
            if(role == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "RoleId does not exist";*/
            }

            //Tu dong tao khoa chinh
            List<Account> accounts = context.Accounts.ToList();

            //Check
            List<Account> ac = accounts.FindAll(acc => acc.UserName == account.UserName);
            if(ac.Count != 0)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            string key = "0";
            foreach (Account account1 in accounts)
            {
                if (int.Parse(account1.AccountId) > int.Parse(key))
                {
                    key = account1.AccountId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            account.AccountId = key;

            context.Accounts.Add(account);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [Authorize]
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
        [Authorize(Roles = "admin")]
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
