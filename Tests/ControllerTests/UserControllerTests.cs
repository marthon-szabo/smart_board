using System.Collections.Generic;
using System.Linq;
using App.Controllers;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.DbIntegrationTest;

namespace Tests.ControllerTests
{
    public class UserControllerTests : AppDbContext
    {
        private readonly IDbIntegrationTester _Tester;
        private SQLUserRepository _userRepo;
        private const string _newDummy = "Zsanett Horváth";
        private const string _existingDummy = "Márton Szabó";
        private readonly UserController _Controller;  

        public UserControllerTests() : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(DbIntegrationTester.GetConnection())
                .Options)
        {
            _userRepo = new SQLUserRepository(this);
            _Tester = new DbIntegrationTester(_userRepo);
            _Controller = new UserController(_userRepo);
        }

        [SetUp]
        public void SetUp()
        {
            _Tester.CreateTable();
        }

        [TestCase(_existingDummy, "123", true)]
        [TestCase(_newDummy, "456", false)]
        public void Register_RegisterVM_ReturnsBool(string dummyUserName, string password, bool expectation)
        {
            // Arrange
            RegisterVM registerDummy = new RegisterVM();
            registerDummy.UserName = dummyUserName;
            registerDummy.Password = password;

            
            // Act
            bool result = _Controller.Register(registerDummy);

            // Assert
            Assert.AreEqual(expectation, result);
        }

        [Test]
        public void Register_ShouldCreateEntity()
        {
            // Arrange
            RegisterVM registerDummy = new RegisterVM();
            registerDummy.UserName = _newDummy;
            registerDummy.Password = "456";

            // Act
            _Controller.Register(registerDummy);

            // Assert
            IEnumerable<User> users = _userRepo.GetAllEntities();
            User userMock = users.Select(user => user).Where(user => user.UserName.Equals(_newDummy)).ToArray()[0];

            Assert.AreEqual(_newDummy, userMock.UserName);
        }

        [TearDown]
        public void TearDown()
        {
            var entities = _userRepo.GetAllEntities();
            _Tester.DropTable(this, entities);
        }

    }

}