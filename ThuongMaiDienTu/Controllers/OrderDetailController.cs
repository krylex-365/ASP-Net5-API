using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly ECContext context;
        public OrderDetailController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<OrderDetail> GetList()
        {
            return context.OrderDetails.ToList();
        }
        [HttpGet("{id}")]
        public OrderDetail GetById(string id)
        {
            return context.OrderDetails.Find(id);
        }
        [HttpPost]
        public string Add(OrderDetail orderDetail)
        {
            OrderDetail orderDetail1 = context.OrderDetails.Find(orderDetail.OrderDetailId);
            if (orderDetail1 != null)
            {
                return "Duplicate primary key";
            }
            Order order = context.Orders.Find(orderDetail.OrderId);
            if (order == null)
            {
                return "OrderId does not exist";
            }
            Product product = context.Products.Find(orderDetail.ProductId);
            if (product == null)
            {
                return "ProductId does not exist";
            }

            context.OrderDetails.Add(orderDetail);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(OrderDetail orderDetail)
        {
            OrderDetail orderDetail1 = context.OrderDetails.Find(orderDetail.OrderDetailId);
            if (orderDetail1 == null)
            {
                return "Update not found";
            }
            Order order = context.Orders.Find(orderDetail.OrderId);
            if (order == null)
            {
                return "OrderId does not exist";
            }
            Product product = context.Products.Find(orderDetail.ProductId);
            if (product == null)
            {
                return "ProductId does not exist";
            }

            context.Entry(orderDetail1).State = EntityState.Detached;
            context.Entry(orderDetail).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            OrderDetail orderDetail = context.OrderDetails.Find(id);
            if (orderDetail == null)
            {
                return "Delete not found";
            }
            
            context.Entry(orderDetail).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
