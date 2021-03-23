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
    [TestFixture]
    public class SQLUserRepositoryTests : AppDbContext
    {

        private readonly DbConnection _connectionString;

        private IDbIntegrationTester _Tester;
        private IUserRepository _userRepo;


        public SQLUserRepositoryTests() : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(DbIntegrationTester.GetConnection())
                .Options)
        {
            
        }

        [SetUp]
        public void SetUp()
        {
            _userRepo = new SQLUserRepository(this);
            _Tester = new DbIntegrationTester(_userRepo);
            _Tester.CreateTable();
        }

        [Test]
        public void GetAllEntities_ReturnsIEnumerableUser()
    {       // Arrange
            string expected = "Test1";

            // Act
            var result = _userRepo.GetAllEntities();

            // Assert
            Assert.AreEqual(expected, result.ToArray()[0].UserId);
        }

        [Test]
        public void Get_UserEntity_ReturnsEntity()
        {
            var result = _userRepo.GetEntityById("Test1");
            Assert.AreEqual("Márton Szabó", result.UserName);
        }

        [TearDown]
        public void TearDown()
        {
            var entities = _userRepo.GetAllEntities();
            _Tester.DropTable(this, entities);
            
            _userRepo = null;
            _Tester = null;
        }
    }
}