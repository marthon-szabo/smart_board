using System.Collections.Generic;
using System.Data.Common;
using App.Models.Entities;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using NUnit.Framework;

namespace Tests.ServiceTests.Repositories

{   
    [TestFixture]
    public class SQLUserRepositoryTests : AppDbContext
    {

        private readonly DbConnection _connectionString;

        private IUserRepository _userRepo;


        public SQLUserRepositoryTests() : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(GetConnection())
                .Options)
        {
        }

        private static string GetConnection()
        {
            IConfiguration configurationStub = Substitute.For<IConfiguration>();
            configurationStub["AppDb:ConnectionStrings:DefaultConnection"] = "Filename=./sm_test_db.db";
            
            string connection = configurationStub["AppDb:ConnectionStrings:DefaultConnection"];

            return connection;

        }

        

        [SetUp]
        public void SetUp()
        {
            AppDbContext context = this;
            IUserRepository repository = new SQLUserRepository(context);
            CreateTable();
        }

        [Test]
        public void Get_UserEntity_ReturnsEntity()
        {
            var result = _userRepo.GetEntityById("First");
            Assert.AreEqual("Márton Szabó", result.UserName);
        }

        [TearDown]
        public void TearDown()
        {
            _userRepo = null;
        }

        private void CreateTable()
        {
            base.Users.Add(
                 new User
                {
                    UserId = "First",
                    UserName = "Márton Szabó",
                    Password = "12345",
                    Email = "stub@stub.com",
                }
            );
        }

        private void DeleteTable(IEnumerable<User> users)
        {
            base.Users.RemoveRange(users);
        }
    }
}