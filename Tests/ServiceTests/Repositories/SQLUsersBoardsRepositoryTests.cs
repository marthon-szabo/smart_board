using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.DbIntegrationTest;

namespace Tests
{
    public class SQLUsersBoardsRepositoryTests : AppDbContext
    {
        private UsersBoardsIntegrationTester _tester;
        private IUsersBoardsRepository _uBRepo;

        public SQLUsersBoardsRepositoryTests() : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(DbIntegrationTester.GetConnection())
                .Options)
        {
            
        }

        [SetUp]
        public void SetUp()
        {
            base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard', 'First Board')");
            base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser', 'Dummy User', 'test', 'a@c.c')");
           
            _uBRepo = new SQLUsersBoardsRepository(this);
            _tester = new UsersBoardsIntegrationTester(_uBRepo);
            _tester.CreateTable();
        }

        [Test]
        public void GetAllBoards_ReturnsBoards()
        {
            // Arrange
            string expected = "TestBoard";

            // Act
            IEnumerable<UsersBoards> uBS = _uBRepo.GetAllEntities();
            
            // Assert
            Assert.AreEqual(expected, uBS.ToArray()[0].BoardId);
        }       

        [TearDown]
        public void TearDown()
        {
            base.Database.ExecuteSqlRaw("DELETE FROM Users_Boards WHERE user_id == 'TestUser'");
            base.Database.ExecuteSqlRaw("DELETE FROM Boards WHERE board_id == 'TestBoard'");
            base.Database.ExecuteSqlRaw("DELETE FROM Users WHERE user_id == 'TestUser'");
            
            _tester = null;
            _uBRepo = null;
        }
    }
}