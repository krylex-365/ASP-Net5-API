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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ECContext context;
        public OrderController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Order> GetList()
        {
            List<Order> orders = context.Orders.ToList().FindAll(ord => ord.Status != "-1");
            return orders;
        }
        [HttpGet("{id}")]
        public List<Order> GetByCustomerId(string id)
        {
            List<Order> orders = context.Orders.ToList().FindAll(or => or.CustomerId == id && or.Status != "-1");
            return orders;        
        }
        [HttpPost]
        public HttpResponseMessage Add(Order order)
        {
            Customer customer = context.Customers.Find(order.CustomerId);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CustomerId does not exist";
            }

            List<Order> orders = context.Orders.ToList();
            string key = "0";
            foreach (Order order1 in orders)
            {
                if (int.Parse(order1.OrderId) > int.Parse(key))
                {
                    key = order1.OrderId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            order.OrderId = key;

            context.Orders.Add(order);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [HttpPut]
        public HttpResponseMessage Update(Order order)
        {
            Order order1 = context.Orders.Find(order.OrderId);
            if (order1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }
            Customer customer = context.Customers.Find(order.CustomerId);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CustomerId does not exist";
            }

            context.Entry(order1).State = EntityState.Detached;
            context.Entry(order).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpPut("{id}")]
        public HttpResponseMessage UpdateId(string id)
        {
            Order order1 = context.Orders.Find(id);
            if (order1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }


            context.Entry(order1).State = EntityState.Detached;

            if(int.Parse(order1.Status) > 0 || int.Parse(order1.Status) < 3)
            {
                int s = int.Parse(order1.Status);
                s++;

                order1.Status = "" + s;
            }

            context.Entry(order1).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Order order = context.Orders.Find(id);
            if (order == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }

            order.Status = "-1";

            context.Entry(order).State = EntityState.Detached;
            context.Entry(order).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
