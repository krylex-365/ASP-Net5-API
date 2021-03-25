using System;
using System.Collections.Generic;
using System.Linq;
using TMDT.Models;

namespace TMDT.Data
{
    public class SeedData
    {
        public static void Initialize(ECContext context)
        {
            context.Database.EnsureCreated();
            if (context.Roles.Any())
            {
                return;
            }

            context.Roles.AddRange(new List<Role>()
            {
                new Role
                {
                    RoleId = "r1",
                    Name = "admin"
                }
            });

            context.Accounts.AddRange(new List<Account>()
            {
                new Account
                {
                    AccountId = "a1",
                    UserName = "u1",
                    Password = "123",
                    Avatar = "a.jpg",
                    RoleId = "r1"
                }
            });

            context.Customers.AddRange(new List<Customer>()
            {
                new Customer
                {
                    CustomerId = "c1",
                    Name = "an",
                    PhoneNumber = "123",
                    Mail = "a@gmail.com",
                    Address = "123/abc",
                    Birthday = new DateTime(2000,1,1),
                    Sex = "nam",
                    AccountId = "a1"
                }
            });

            context.Orders.AddRange(new List<Order>()
            {
                new Order
                {
                    OrderId = "o1",
                    Date = new DateTime(2000,1,1),
                    Note = "abc",
                    Payment = "1234567890",
                    Status = "bt",
                    CustomerId = "c1"
                }
            });

            context.Categories.AddRange(new List<Category>()
            {
                new Category
                {
                    CategoryId = "c1",
                    Name = "an"
                }
            });

            context.Subcategories.AddRange(new List<Subcategory>()
            {
                new Subcategory
                {
                    SubcategoryId = "s1",
                    Name = "an",
                    CategoryId = "c1"
                }
            });

            context.Products.AddRange(new List<Product>()
            {
                new Product
                {
                    ProductId = "p1",
                    Name = "an",
                    Price = "200",
                    Image = "a.jpg",
                    Description = "abc",
                    Sale = "0%",
                    Status = "bt",
                    Quantity = "a1",
                    SubcategoryId = "s1"
                }
            });

            context.OrderDetails.AddRange(new List<OrderDetail>()
            {
                new OrderDetail
                {
                    OrderDetailId = "o1",
                    Quantity = "an",
                    TotalPrice = "200",
                    OrderId = "o1",
                    ProductId = "p1"
                }
            });

            context.Reviews.AddRange(new List<Review>()
            {
                new Review
                {
                    ReviewId = "r1",
                    Comment = "an",
                    Rating = 5,
                    CustomerId = "c1",
                    ProductId = "p1"
                }
            });

            context.SaveChanges();
        }
    }
}
