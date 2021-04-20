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
            return context.Subcategories.ToList();
        }
        [HttpGet("{id}")]
        public Subcategory GetById(string id)
        {
            return context.Subcategories.Find(id);
        }
        [HttpPost]
        public HttpResponseMessage Add(Subcategory subcategory)
        {
            Subcategory subcategory1 = context.Subcategories.Find(subcategory.SubcategoryId);
            if (subcategory1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Duplicate primary key";
            }
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
            Product product = context.Products.ToList().Find(x => x.SubcategoryId == id);
            if (product != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete foreign key first (Product)";
            }

            context.Entry(subcategory).State = EntityState.Deleted;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
