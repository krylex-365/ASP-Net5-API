using System;
using System.Collections.Generic;
using System.Linq;
using ThuongMaiDienTu.Models;
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
                    RoleId = "1",
                    Name = "admin"
                },
                new Role
                {
                    RoleId = "2",
                    Name = "user"
                }
            });

            context.Accounts.AddRange(new List<Account>()
            {
                new Account
                {
                    AccountId = "1",
                    UserName = "admin",
                    Password = "123",
                    Avatar = "default.jpg",
                    RoleId = "1",
                    Status = "0",
                }
            });

            context.Customers.AddRange(new List<Customer>()
            {
                new Customer
                {
                    CustomerId = "1",
                    Name = "admin",
                    PhoneNumber = "01219470121",
                    Mail = "admin@gmail.com",
                    Address = "000/aaa",
                    Birthday = new DateTime(2000,1,1),
                    Sex = "Male",
                    AccountId = "1",
                    Status = "0",
                }
            });

            context.Orders.AddRange(new List<Order>()
            {
                new Order
                {
                    OrderId = "0",
                    Date = new DateTime(2000,1,1),
                    Note = "Test Ship",
                    Payment = "NNN",
                    Status = "1",
                    CustomerId = "1"
                }
            });

            context.Categories.AddRange(new List<Category>()
            {
                new Category
                {
                    CategoryId = "0",
                    Name = "Test Cate",
                    Status = "-1",
                }
            });

            context.Subcategories.AddRange(new List<Subcategory>()
            {
                new Subcategory
                {
                    SubcategoryId = "0",
                    Name = "Test Subcate",
                    CategoryId = "0",
                    Status = "-1",
                }
            });

            context.Products.AddRange(new List<Product>()
            {
                new Product
                {
                    ProductId = "0",
                    Name = "Test Product",
                    Price = "300",
                    Image = "default.jpg",
                    Description = "San pham thu nhat",
                    Sale = "0",
                    Status = "-1",
                    Quantity = "34",
                    SubcategoryId = "0"
                }
            });

            context.OrderDetails.AddRange(new List<OrderDetail>()
            {
                new OrderDetail
                {
                    OrderDetailId = "0",
                    Quantity = "1",
                    TotalPrice = "300",
                    OrderId = "0",
                    ProductId = "0"
                }
            });

            context.Reviews.AddRange(new List<Review>()
            {
                new Review
                {
                    ReviewId = "0",
                    Comment = "NNN",
                    ReviewDate = new DateTime(2000,1,1),
                    CustomerId = "1",
                    ProductId = "0"
                }
            });

            context.Cards.AddRange(new List<Card>()
            {
                new Card
                {
                    CardId = "0",
                    CustomerId = "1",
                    ProductId = "0"
                }
            });

            context.SaveChanges();
        }
    }
}
