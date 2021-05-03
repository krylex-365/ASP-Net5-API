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
        [HttpGet("Order/{id}")]
        public List<OrderDetail> GetAllByOrderId(string id)
        {
            List<OrderDetail> orderDetails = context.OrderDetails.ToList().FindAll(det => det.OrderId == id);
            return orderDetails;
        }
        [HttpPost]
        public HttpResponseMessage Add(OrderDetail orderDetail)
        {
            OrderDetail orderDetail1 = context.OrderDetails.Find(orderDetail.OrderDetailId);
            if (orderDetail1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Duplicate primary key";
            }
            Order order = context.Orders.Find(orderDetail.OrderId);
            if (order == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "OrderId does not exist";
            }
            Product product = context.Products.Find(orderDetail.ProductId);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "ProductId does not exist";
            }

            context.OrderDetails.Add(orderDetail);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [HttpPut]
        public HttpResponseMessage Update(OrderDetail orderDetail)
        {
            OrderDetail orderDetail1 = context.OrderDetails.Find(orderDetail.OrderDetailId);
            if (orderDetail1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }
            Order order = context.Orders.Find(orderDetail.OrderId);
            if (order == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "OrderId does not exist";
            }
            Product product = context.Products.Find(orderDetail.ProductId);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "ProductId does not exist";
            }

            context.Entry(orderDetail1).State = EntityState.Detached;
            context.Entry(orderDetail).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            OrderDetail orderDetail = context.OrderDetails.Find(id);
            if (orderDetail == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }
            
            context.Entry(orderDetail).State = EntityState.Deleted;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
