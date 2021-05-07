using Microsoft.EntityFrameworkCore;
using ThuongMaiDienTu.Models;
using TMDT.Models;

namespace TMDT.Data
{
    public class ECContext : DbContext
    {
        public ECContext(DbContextOptions<ECContext> options) : base(options)
        {

        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Card> Cards { get; set; }
    }
}
