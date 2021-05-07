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
                },
                new Account
                {
                    AccountId = "2",
                    UserName = "user",
                    Password = "123",
                    Avatar = "default.jpg",
                    RoleId = "2",
                    Status = "0",
                }
            });

            context.Customers.AddRange(new List<Customer>()
            {
                new Customer
                {
                    CustomerId = "1",
                    Name = "admin",
                    PhoneNumber = "000000000",
                    Mail = "admin@gmail.com",
                    Address = "000/aaa",
                    Birthday = new DateTime(2000,1,1),
                    Sex = "Nam",
                    AccountId = "1",
                    Status = "0",
                }
            });

            context.Orders.AddRange(new List<Order>()
            {
                new Order
                {
                    OrderId = "1",
                    Date = new DateTime(2000,1,1),
                    Note = "NNN",
                    Payment = "1234567890",
                    Status = "1",
                    CustomerId = "1"
                }
            });

            context.Categories.AddRange(new List<Category>()
            {
                new Category
                {
                    CategoryId = "1",
                    Name = "Clothes",
                    Status = "0",
                },
                new Category
                {
                    CategoryId = "2",
                    Name = "Ruby",
                    Status = "0",
                },
                new Category
                {
                    CategoryId = "3",
                    Name = "Toys",
                    Status = "0",
                }
            });

            context.Subcategories.AddRange(new List<Subcategory>()
            {
                new Subcategory
                {
                    SubcategoryId = "1",
                    Name = "Toys 1",
                    CategoryId = "3",
                    Status = "0",
                },
                new Subcategory
                {
                    SubcategoryId = "4",
                    Name = "Man Clothes 1",
                    CategoryId = "1",
                    Status = "0",
                }
            });

            context.Products.AddRange(new List<Product>()
            {
                new Product
                {
                    ProductId = "1",
                    Name = "Roll Underarm Male",
                    Price = "300000",
                    Image = "1.jpg",
                    Description = "San pham thu nhat",
                    Sale = "30",
                    Status = "1",
                    Quantity = "34",
                    SubcategoryId = "4"
                }
            });

            context.OrderDetails.AddRange(new List<OrderDetail>()
            {
                new OrderDetail
                {
                    OrderDetailId = "1",
                    Quantity = "1",
                    TotalPrice = "30",
                    OrderId = "1",
                    ProductId = "1"
                }
            });

            context.Reviews.AddRange(new List<Review>()
            {
                new Review
                {
                    ReviewId = "1",
                    Comment = "NNN",
                    ReviewDate = new DateTime(2000,1,1),
                    CustomerId = "1",
                    ProductId = "1"
                }
            });

            context.Cards.AddRange(new List<Card>()
            {
                new Card
                {
                    CardId = "1",
                    CustomerId = "1",
                    ProductId = "1"
                }
            });

            context.SaveChanges();
        }
    }
}
