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
    public class ReviewController : ControllerBase
    {
        private readonly ECContext context;
        public ReviewController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Review> GetList()
        {
            return context.Reviews.ToList();
        }
        [HttpGet("{id}")]
        public Review GetById(string id)
        {
            return context.Reviews.Find(id);
        }
        [HttpPost]
        public string Add(Review review)
        {
            Review review1 = context.Reviews.Find(review.ReviewId);
            if (review1 != null)
            {
                return "Duplicate primary key";
            }
            Customer customer = context.Customers.Find(review.CustomerId);
            if (customer == null)
            {
                return "CustomerId does not exist";
            }
            Product product = context.Products.Find(review.ProductId);
            if (product == null)
            {
                return "ProductId does not exist";
            }

            context.Reviews.Add(review);
            context.SaveChanges();

            return "Added";
        }
        [HttpPut]
        public string Update(Review review)
        {
            Review review1 = context.Reviews.Find(review.ReviewId);
            if (review1 == null)
            {
                return "Update not found";
            }
            Customer customer = context.Customers.Find(review.CustomerId);
            if (customer == null)
            {
                return "CustomerId does not exist";
            }
            Product product = context.Products.Find(review.ProductId);
            if (product == null)
            {
                return "ProductId does not exist";
            }

            context.Entry(review1).State = EntityState.Detached;
            context.Entry(review).State = EntityState.Modified;
            context.SaveChanges();

            return "Updated";
        }
        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            Review review = context.Reviews.Find(id);
            if (review == null)
            {
                return "Delete not found";
            }

            context.Entry(review).State = EntityState.Deleted;
            context.SaveChanges();
            return "Deleted";
        }
    }
}
