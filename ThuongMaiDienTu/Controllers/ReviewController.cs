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
        public HttpResponseMessage Add(Review review)
        {
            
            Customer customer = context.Customers.Find(review.CustomerId);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CustomerId does not exist";
            }

            List<Review> reviews = context.Reviews.ToList();
            string key = "0";
            foreach (Review review2 in reviews)
            {
                if (int.Parse(review2.ReviewId) > int.Parse(key))
                {
                    key = review2.ReviewId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            review.ReviewId = key;

            Product product = context.Products.Find(review.ProductId);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "ProductId does not exist";
            }
           
            context.Reviews.Add(review);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Added";
        }
        [HttpPut]
        public HttpResponseMessage Update(Review review)
        {
            Review review1 = context.Reviews.Find(review.ReviewId);
            if (review1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }
            Customer customer = context.Customers.Find(review.CustomerId);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "CustomerId does not exist";
            }
            Product product = context.Products.Find(review.ProductId);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "ProductId does not exist";
            }

            context.Entry(review1).State = EntityState.Detached;
            context.Entry(review).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Review review = context.Reviews.Find(id);
            if (review == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }

            context.Entry(review).State = EntityState.Deleted;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
