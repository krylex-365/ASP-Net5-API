﻿using Microsoft.AspNetCore.Authorization;
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
            List<Customer> customers = context.Customers.ToList().FindAll(cus => cus.Status != "-1");
            return customers;
        }
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
        [HttpPost]
        public HttpResponseMessage Add(Customer customer)
        {
            Customer customer1 = context.Customers.Find(customer.AccountId);
            if (customer1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                /*return "Duplicate primary key";*/
            }
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
