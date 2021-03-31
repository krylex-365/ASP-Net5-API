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
            return context.Categories.ToList();
        }
        [HttpGet("{id}")]
        public Category GetById(string id)
        {
            return context.Categories.Find(id);
        }
        [HttpPost]
        public string Add(Category category)
        {
            Category category1 = context.Categories.Find(category.CategoryId);
            if (category1 != null)
            {
                return "Duplicate primary key";
            }

            context.Categories.Add(category);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Category category)
        {
            Category category1 = context.Categories.Find(category.CategoryId);
            if (category1 == null)
            {
                return "Update not found";
            }

            context.Entry(category1).State = EntityState.Detached;
            context.Entry(category).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Category category = context.Categories.Find(id);
            if (category == null)
            {
                return "Delete not found";
            }

            Subcategory subcategory = context.Subcategories.ToList().Find(x => x.CategoryId == id);
            if(subcategory != null)
            {
                return "Delete foreign key first (Subcategory)";
            }
            
            context.Entry(category).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
