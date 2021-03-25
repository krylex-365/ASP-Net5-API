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
    public class CustomerController : ControllerBase
    {
        private readonly ECContext context;
        public CustomerController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Customer> GetList()
        {
            return context.Customers.ToList();
        }
        [HttpGet("{id}")]
        public Customer GetById(string id)
        {
            return context.Customers.Find(id);
        }
        [HttpPost]
        public string Add(Customer customer)
        {
            Customer customer1 = context.Customers.Find(customer.AccountId);
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
        }
    }
}
