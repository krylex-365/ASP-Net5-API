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
            return context.Orders.ToList();
        }
        [HttpGet("{id}")]
        public Order GetById(string id)
        {
            return context.Orders.Find(id);
        }
        [HttpPost]
        public string Add(Order order)
        {
            Order order1 = context.Orders.Find(order.OrderId);
            if (order1 != null)
            {
                return "Duplicate primary key";
            }
            Customer customer = context.Customers.Find(order.CustomerId);
            if (customer == null)
            {
                return "CustomerId does not exist";
            }

            context.Orders.Add(order);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Order order)
        {
            Order order1 = context.Orders.Find(order.OrderId);
            if (order1 == null)
            {
                return "Update not found";
            }
            Customer customer = context.Customers.Find(order.CustomerId);
            if (customer == null)
            {
                return "CustomerId does not exist";
            }

            context.Entry(order1).State = EntityState.Detached;
            context.Entry(order).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Order order = context.Orders.Find(id);
            if (order == null)
            {
                return "Delete not found";
            }
            OrderDetail orderDetail = context.OrderDetails.ToList().Find(x => x.OrderId == id);
            if (orderDetail != null)
            {
                return "Delete foreign key first (OrderDetail)";
            }
            context.Entry(order).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
