using System.IO;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using App.Controllers;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.DbIntegrationTest;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Tests.ControllerTests
{
    public class UserControllerTests : AppDbContext
    {
        private readonly IDbIntegrationTester _Tester;
        private SQLUserRepository _userRepo;
        private const string _newDummy = "Zsanett Horváth";
        private const string _existingDummy = "Márton Szabó";
        private readonly UserController _Controller;
        private HttpClient _Client; 

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
            _Client = new HttpClient();
        }

        [TestCase(_existingDummy, "123", null)]
        [TestCase(_newDummy, "456", "Zsanett Horváth")]
        public void Register_RegisterVM_ReturnsBool(string dummyUserName, string password, string? expectation)
        {
            // Arrange
            RegisterVM registerDummy = new RegisterVM();
            registerDummy.UserName = dummyUserName;
            registerDummy.Password = password;

            var controllerContext = new ControllerContext()
            {
                HttpContext = this.CreateHttpContext<RegisterVM>(registerDummy)
            };

            _Controller.ControllerContext = controllerContext;

            // Act
            UserProfileVM result = _Controller.Register();

            // Assert
            Assert.AreEqual(expectation, result.Username);
        }

        private DefaultHttpContext CreateHttpContext<T>(T content)
        {
            DefaultHttpContext httpContext = new DefaultHttpContext();

            var stream = new MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(content)));

            httpContext.Request.Body = stream;
            httpContext.Request.ContentLength = stream.Length;

            return httpContext;

            // WebRequest request = WebRequest.Create(endpoint);
            // request.Method = httpMethod.ToUpper();
            // request.ContentType = "application/json";

            // using(StreamWriter writer = new StreamWriter(request.GetRequestStream()))
            // {
            //     string jsonContent = JsonContent.Create(content).ToString();

            //     writer.Write(jsonContent);
            //     writer.Flush();
            //     writer.Close();
            // }

            // return request;
        }

        // [Test]
        // public void Register_ShouldCreateEntity()
        // {
        //     // Arrange
        //     RegisterVM registerDummy = new RegisterVM();
        //     registerDummy.UserName = _newDummy;
        //     registerDummy.Password = "456";

        //     // Act
        //     _Controller.Register(registerDummy);

        //     // Assert
        //     IEnumerable<User> users = _userRepo.GetAllEntities();
        //     User userMock = users.Select(user => user).Where(user => user.UserName.Equals(_newDummy)).ToArray()[0];

        //     Assert.AreEqual(_newDummy, userMock.UserName);
        // }

        [TearDown]
        public void TearDown()
        {
            var entities = _userRepo.GetAllEntities();
            _Tester.DropTable(this, entities);
            _Client = null;
        }

    }

}