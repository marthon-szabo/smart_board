using System.Collections.Generic;
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

        [TestCase("Márton Szabó", true)]
        [TestCase("Zsanett Horváth", false)]
        public void Register_RegisterVM_ReturnsBool(string dummyUserName, bool expectation)
        {
            // Arrange
            RegisterVM registerDummy = new RegisterVM();
            registerDummy.UserName = dummyUserName;
            
            // Act
            bool result = _Controller.Register(registerDummy);

            // Assert
            Assert.AreEqual(expectation, result);
        }

        [TearDown]
        public void TearDown()
        {
            var entities = _userRepo.GetAllEntities();
            _Tester.DropTable(this, entities);
        }

    }

}