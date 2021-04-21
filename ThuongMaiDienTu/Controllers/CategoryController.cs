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
    public class CategoryController : ControllerBase
    {
        private readonly ECContext context;
        public CategoryController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Category> GetList()
        {
            List<Category> categories = context.Categories.ToList().FindAll(cat => cat.Status != "-1");
            return categories;
        }
        [HttpGet("{id}")]
        public Category GetById(string id)
        {
            Category category = context.Categories.Find(id);
            if(category != null && category.Status != "-1")
            {
                return category;
            }
            return null;
        }
        [HttpPost]
        public HttpResponseMessage Add(Category category)
        {
            //Tu dong tao khoa chinh
            List<Category> categories = context.Categories.ToList();
            string key = "0";
            foreach(Category category1 in categories)
            {
                if(int.Parse(category1.CategoryId) > int.Parse(key))
                {
                    key = category1.CategoryId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            category.CategoryId = key;

            context.Categories.Add(category);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        public HttpResponseMessage Update(Category category)
        {
            Category category1 = context.Categories.Find(category.CategoryId);
            if (category1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            context.Entry(category1).State = EntityState.Detached;
            context.Entry(category).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Category category = context.Categories.Find(id);
            if (category == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            List<Subcategory> subcategorys = context.Subcategories.ToList().FindAll(sub => sub.CategoryId == category.CategoryId);
            foreach(Subcategory subcategory in subcategorys)
            {
                if (subcategory.Status != "-1")
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
            }

            category.Status = "-1";

            context.Entry(category).State = EntityState.Deleted;
            context.Entry(category).State = EntityState.Modified;
            context.SaveChanges();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
