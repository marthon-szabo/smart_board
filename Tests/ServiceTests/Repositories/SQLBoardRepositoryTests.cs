using System.Linq;
using System.Globalization;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using App.Services.Repositories;

namespace Tests
{
    public class SQLBoardRepositoryTests : SQLRepositoryTestsBase<SQLBoardRepository, Board>
    {
        private static string[] seedValues = new string[4]
        {
            "TestBoard1", "Test board 1",
            "TestBoard2", "Test board 2"
        };

        public SQLBoardRepositoryTests() : base(seedValues)
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser1', 'Dummy User', 'test', 'a@c.c')");
                base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard1', 'Test Board 1')");
                base.Database.ExecuteSqlRaw("INSERT INTO Users_Boards VALUES('TestUsersBoards', 'TestBoard1', 'TestUser1')");
            };
        }

        [Test]
        public void GetAllBoardsByUsername_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "Test Board 1";

            // Act
            string result = base._repo.GetAllBoardsByUsername("Dummy User").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }
    }
}