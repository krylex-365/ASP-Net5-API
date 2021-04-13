using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ThuongMaiDienTu.Models;
using TMDT.Data;
using TMDT.Models;

namespace ThuongMaiDienTu.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly ECContext context;
        public UserAccountController(ECContext context)
        {
            this.context = context;
        }
        /*[HttpGet]
        public List<UserAccount> GetList()
        {
            List<Account> accounts = context.Accounts.ToList();
            List<Customer> customers = context.Customers.ToList();

            List<UserAccount> userAccounts = new List<UserAccount>();

            UserAccount userAccount;
            Account account;
            foreach (Customer customer in customers)
            {
                account = accounts.Find(ac => ac.AccountId == customer.AccountId);
                userAccount = new UserAccount()
                {
                    CustomerId = customer.CustomerId,
                    Address = customer.Address,
                    Birthday = customer.Birthday,
                    Mail = customer.Mail,
                    Name = customer.Name,
                    Password = account.Password,
                    PhoneNumber = customer.PhoneNumber,
                    RoleId = account.RoleId,
                    Sex = customer.Sex,
                    UserName = account.UserName,
                };
                userAccounts.Add(userAccount);
            }
            return userAccounts;
        }*/

        /*[HttpGet("{id}")]
        public UserAccount GetById(string id)
        {
            return context.UserAccount.Find(id);
        }

        [HttpPost]
        public string Add(UserAccount useraccount)
        {
            
            Customer customer1 = context.Customers.Find(useraccount.CustomerId);
            if (customer1 != null)
            {
                return "Duplicate primary key";
            }
            Account account = context.Accounts.Find(customer.AccountId);
            if (account == null)
            {
                return "AccountId does not exist";
            }

            context.Customers.Add(customer);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Customer customer)
        {
            Customer customer1 = context.Customers.Find(customer.CustomerId);
            if (customer1 == null)
            {
                return "Update not found";
            }
            Account account = context.Accounts.Find(customer.AccountId);
            if (account == null)
            {
                return "AccountId does not exist";
            }

            context.Entry(customer1).State = EntityState.Detached;
            context.Entry(customer).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Customer customer = context.Customers.Find(id);
            if (customer == null)
            {
                return "Delete not found";
            }
            Review review = context.Reviews.ToList().Find(x => x.CustomerId == id);
            if (review != null)
            {
                return "Delete foreign key first (Review)";
            }
            Order order = context.Orders.ToList().Find(x => x.CustomerId == id);
            if (order != null)
            {
                return "Delete foreign key first (Order)";
            }
            context.Entry(customer).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }*/
    }
}

