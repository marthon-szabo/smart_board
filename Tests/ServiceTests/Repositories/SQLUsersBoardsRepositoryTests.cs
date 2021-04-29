using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    public class SQLUsersBoardsRepositoryTests : SQLRepositoryTestsBase<SQLUserRepository, User> 
    {
        private IUsersBoardsRepository _uBRepo;

        public SQLUsersBoardsRepositoryTests()
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard', 'First Board')");
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser', 'Dummy User', 'test', 'a@c.c')");
                base.Database.ExecuteSqlRaw("INSERT INTO Users_Boards VALUES('UBTest', 'TestBoard', 'TestUser')");
            };

            _uBRepo = new SQLUsersBoardsRepository(this);

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

        protected override void TearDown()
        {
            base.Database.ExecuteSqlRaw("DELETE FROM Users_Boards WHERE user_id == 'TestUser'");
            base.Database.ExecuteSqlRaw("DELETE FROM Boards WHERE board_id == 'TestBoard'");
            base.Database.ExecuteSqlRaw("DELETE FROM Users WHERE user_id == 'TestUser'");
            
            _uBRepo = null;
        }
    }
}