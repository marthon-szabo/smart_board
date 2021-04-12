using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories;
using NUnit.Framework;
using System.Linq;

namespace Tests.ServiceTests.Repositories

{   
    public class SQLUserRepositoryTests : SQLRepositoryTestsBase<SQLUserRepository, User>  
    {

        private static IDictionary<string, string[]> seedValues = new Dictionary<string, string[]>
        {
            { "UserId", new string[] { "TestUser1", "TestUser2" } },
            { "UserName", new string[] { "Test user 1", "Test user 2" } },
            { "Email", new string[] { "test1@test1.com", "test1@test2.com" } }
        };

        public SQLUserRepositoryTests() : base(seedValues)
        {
        }

        [Test]
        public void GetAllEntities_ReturnsIEnumerableUser()
    {       // Arrange
            string expected = "TestUser1";

            // Act
            var result = _repo.GetAllEntities();

            // Assert
            Assert.AreEqual(expected, result.ToArray()[0].UserId);
        }

        [Test]
        public void Get_UserEntity_ReturnsEntity()
        {
            User result = _repo.GetEntityById("TestUser1");
            Assert.AreEqual("Test user 1", result.UserName);
        }
    }
}