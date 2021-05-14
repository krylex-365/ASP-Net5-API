using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ThuongMaiDienTu.Models;
using TMDT.Data;
using TMDT.Models;

namespace ThuongMaiDienTu.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly ECContext context;
        public CheckoutController(ECContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public HttpResponseMessage Add(Checkout checkout)
        {
            foreach (OrderDetail orderDetail in checkout.OrderDetails)
            {
                Product product = context.Products.Find(orderDetail.ProductId);
                if (product == null || Int32.Parse(product.Quantity) < Int32.Parse(orderDetail.Quantity))
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                    //return "ProductId does not exist";
                }
            }

            Customer customer = context.Customers.Find(checkout.Order.CustomerId);
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
            checkout.Order.OrderId = key;
            context.Entry(checkout.Order).State = EntityState.Added;

            //OrderDetails
            List<OrderDetail> orderDetails = context.OrderDetails.ToList();
            string keyd = "0";
            foreach (OrderDetail orderDetail1 in orderDetails)
            {
                if (int.Parse(orderDetail1.OrderDetailId) > int.Parse(keyd))
                {
                    keyd = orderDetail1.OrderDetailId;
                }
            }

            foreach(OrderDetail orderDetail in checkout.OrderDetails)
            {
                keyd = "" + (int.Parse(keyd) + 1);
                orderDetail.OrderDetailId = keyd;
                orderDetail.OrderId = key;

                Product product = context.Products.Find(orderDetail.ProductId);

                context.Entry(orderDetail).State = EntityState.Added;
                context.SaveChanges();

                //Update quantity product
                product.Quantity = (Int32.Parse(product.Quantity) - Int32.Parse(orderDetail.Quantity)) + "";
                context.Entry(product).State = EntityState.Detached;
                context.Entry(product).State = EntityState.Modified;
            }

            //Del cart
            List<Card> cards = context.Cards.ToList().FindAll(car => car.CustomerId == checkout.Order.CustomerId);
            foreach(Card card in cards)
            {
                context.Entry(card).State = EntityState.Deleted;
            }

            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
    }
}
