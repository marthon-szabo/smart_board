using Microsoft.EntityFrameworkCore;

namespace App.Models.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = "First",
                    UserName = "Márton Szabó",
                    Password = "12345",
                    Email = "stub@stub.com",
                }
            );
        }
    }
}