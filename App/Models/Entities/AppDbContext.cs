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
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatGroup> ChatGroups { get; set; }

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

            modelBuilder.Entity<Board>().HasData(
                new Board
                {
                    BoardName = "My board",
                    BoardId = "myBoard"
                }
            );
            
            modelBuilder.Entity<Column>().HasData(
                new Column
                {
                    Id = "myColumn",
                    Name = "My Column",
                    BoardId = "myBoard"
                }
            );

            modelBuilder.Entity<Task>().HasData(
                new Task
                {
                    Id = "myTaks",
                    TaskName = "My Task1",
                    ColumnId = "myColumn"
                }
            );
            
            modelBuilder.Entity<Task>().HasData(
                new Task
                {
                    Id = "myTaks2",
                    TaskName = "My Task2",
                    ColumnId = "myColumn"
                }
            );
        }
    }
}