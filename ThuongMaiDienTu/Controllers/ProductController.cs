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
    public class ProductController : ControllerBase
    {
        private readonly ECContext context;
        public ProductController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Product> GetList()
        {
            return context.Products.ToList();
        }
        [HttpGet("{id}")]
        public Product GetById(string id)
        {
            return context.Products.Find(id);
        }
        [HttpPost]
        public HttpResponseMessage Add(Product product)
        {
            Product product1 = context.Products.Find(product.ProductId);
            if (product1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Duplicate primary key";
            }
            Subcategory subcategory = context.Subcategories.Find(product.SubcategoryId);
            if (subcategory == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "SubcategoryId does not exist";
            }

            context.Products.Add(product);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [HttpPut]
        public HttpResponseMessage Update(Product product)
        {
            Product product1 = context.Products.Find(product.ProductId);
            if (product1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }
            Subcategory subcategory = context.Subcategories.Find(product.SubcategoryId);
            if (subcategory == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "SubcategoryId does not exist";
            }

            context.Entry(product1).State = EntityState.Detached;
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Product product = context.Products.Find(id);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }
            Review review = context.Reviews.ToList().Find(x => x.ProductId == id);
            if (review != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete foreign key first (Review)";
            }
            OrderDetail orderDetail = context.OrderDetails.ToList().Find(x => x.ProductId == id);
            if (orderDetail != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete foreign key first (OrderDetail)";
            }
            context.Entry(product).State = EntityState.Deleted;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
