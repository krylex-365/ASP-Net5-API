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
    public class CustomerController : ControllerBase
    {
        private readonly ECContext context;
        public CustomerController(ECContext context)
        {
            this.context = context;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public List<Customer> GetList()
        {
            List<Customer> customers = context.Customers.ToList().FindAll(cus => cus.Status != "-1");
            return customers;
        }
        [Authorize]
        [HttpGet("{id}")]
        public Customer GetById(string id)
        {
            Customer customer = context.Customers.Find(id);
            if(customer != null && customer.Status != "-1")
            {
                return customer;
            }
            return null;
        }
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Add(Customer customer)
        {
            //Tu dong tao khoa chinh
            List<Customer> customers = context.Customers.ToList();
            string key = "0";
            foreach (Customer customer1 in customers)
            {
                if (int.Parse(customer1.CustomerId) > int.Parse(key))
                {
                    key = customer1.CustomerId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            customer.CustomerId = key;
            customer.AccountId = key;

            Account account = context.Accounts.Find(customer.AccountId);
            if (account == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "AccountId does not exist";*/
            }

            context.Customers.Add(customer);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [Authorize]
        [HttpPut]
        public HttpResponseMessage Update(Customer customer)
        {
            Customer customer1 = context.Customers.Find(customer.CustomerId);
            if (customer1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Update not found";*/
            }
            Account account = context.Accounts.Find(customer.AccountId);
            if (account == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "AccountId does not exist";*/
            }

            context.Entry(customer1).State = EntityState.Detached;
            context.Entry(customer).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Customer customer = context.Customers.Find(id);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }

            Account account = context.Accounts.Find(customer.AccountId);

            if (account != null)
            {
                account.Status = "-1";
                context.Entry(account).State = EntityState.Deleted;
                context.Entry(account).State = EntityState.Modified;
            }

            customer.Status = "-1";
            context.Entry(customer).State = EntityState.Deleted;
            context.Entry(customer).State = EntityState.Modified;

            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
