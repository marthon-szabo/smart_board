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
        public DbSet<Board> Boards { get; set; }
        public DbSet<UsersBoards> UsersBoards { get; set; }
        public DbSet<Column> Columns { get; set; }
        public DbSet<Task> Tasks { get; set; }

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