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
            List<Product> products = context.Products.ToList().FindAll(pro => pro.Status != "-1");
            return products;
        }
        [HttpGet("{id}")]
        public Product GetById(string id)
        {
            Product product = context.Products.Find(id);
            if(product != null && product.Status != "-1")
            {
                return product;
            }
            return null;
        }
        [HttpPost]
        public HttpResponseMessage Add(Product product)
        {
            
            Subcategory subcategory = context.Subcategories.Find(product.SubcategoryId);
            if (subcategory == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "SubcategoryId does not exist";
            }

            //Tu dong tao khoa chinh
            List<Product> products = context.Products.ToList();
            string key = "0";
            foreach (Product product2 in products)
            {
                if (int.Parse(product2.ProductId) > int.Parse(key))
                {
                    key = product2.ProductId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            product.ProductId = key;

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

            product.Status = "-1";

            context.Entry(product).State = EntityState.Deleted;
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
