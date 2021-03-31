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
    public class DashboardController : ControllerBase
    {
        private ECContext context;
        public DashboardController(ECContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Dashboard> getNewOder()
        {
            List<Order> orders = context.Orders.ToList().FindAll(data => data.Status == "1");
            List<Dashboard> dashboards = mapToDashboard(orders);
            return dashboards;
        }
        private List<Dashboard> mapToDashboard(List<Order> orders)
        {
            List<Dashboard> dashboards = new List<Dashboard>();
            foreach(Order order in orders)
            {
                Customer customer = context.Customers.Find(order.CustomerId);
                OrderDetail orderDetail = context.OrderDetails.ToList().Find(data => data.OrderId == order.OrderId);

                dashboards.Add(new Dashboard()
                {
                    OrderId = order.OrderId,
                    Address = customer.Address,
                    BuyDate = order.Date,
                    CustomerName = customer.Name,
                    Status = order.Status,
                    OrderDetail = orderDetail,
                });
            }

            return dashboards;
        }
    }
}
