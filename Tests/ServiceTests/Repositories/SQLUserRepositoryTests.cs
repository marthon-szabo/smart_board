using System.Data.Common;
using App.Models.Entities;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using Tests.DbIntegrationTest;

namespace Tests.ServiceTests.Repositories

{   
    public class SQLUserRepositoryTests : SQLRepositoryTestsBase<SQLUserRepository, User>  
    {

        private static string[] seedValues = new string[8]
        {
            "TestUser1", "Test user 1", "Test1", "test1@test1.com",
            "TestUser2", "Test user 2", "Test2", "test2@test2.com"
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