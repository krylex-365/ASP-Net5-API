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
    public class SubcategoryController : ControllerBase
    {
        private readonly ECContext context;
        public SubcategoryController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Subcategory> GetList()
        {
            List<Subcategory> subcategories = context.Subcategories.ToList().FindAll(sub => sub.Status != "-1");
            return subcategories;
        }
        [HttpGet("{id}")]
        public Subcategory GetById(string id)
        {
            Subcategory subcategory = context.Subcategories.Find(id);
            if(subcategory != null && subcategory.Status != "-1")
            {
                return subcategory;
            }
            return null;
        }
        [HttpPost]
        public HttpResponseMessage Add(Subcategory subcategory)
        {
            //Tu dong tao khoa chinh
            List<Subcategory> subcategories = context.Subcategories.ToList();
            string key = "0";
            foreach (Subcategory subcategory2 in subcategories)
            {
                if (int.Parse(subcategory2.SubcategoryId) > int.Parse(key))
                {
                    key = subcategory2.SubcategoryId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            subcategory.SubcategoryId = key;

            Category category = context.Categories.Find(subcategory.CategoryId);
            if (category == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CategoryId does not exist";
            }

            context.Subcategories.Add(subcategory);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [HttpPut]
        public HttpResponseMessage Update(Subcategory subcategory)
        {
            Subcategory subcategory1 = context.Subcategories.Find(subcategory.SubcategoryId);
            if (subcategory1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }
            Category category = context.Categories.Find(subcategory.CategoryId);
            if (category == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CategoryId does not exist";
            }

            context.Entry(subcategory1).State = EntityState.Detached;
            context.Entry(subcategory).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Subcategory subcategory = context.Subcategories.Find(id);
            if (subcategory == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }

            List<Product> products = context.Products.ToList().FindAll(pro => pro.SubcategoryId == subcategory.SubcategoryId);
            foreach (Product product in products)
            {
                if (product.Status != "-1")
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
            }

            subcategory.Status = "-1";

            context.Entry(subcategory).State = EntityState.Deleted;
            context.Entry(subcategory).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
