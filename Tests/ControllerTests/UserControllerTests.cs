using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using App.Controllers;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.TestDbServices;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NSubstitute;

namespace Tests.ControllerTests
{
    public class UserControllerTests : SQLRepositoryTestsBase<SQLUserRepository, User>
    {
        private const string _newDummy = "Zsanett Horváth";
        private const string _existingDummy = "Márton Szabó";
        private readonly UserController _Controller;
        private HttpClient _Client; 

        public UserControllerTests() : base(new Dictionary<string, string[]>
            {
                {"UserId", new string[]{"MarthonSzabo"}},
                {"UserName", new string[]{"Márton Szabó"}},
                {"Password", new string[]{"MártonSzabó"}},
                {"Email", new string[]{"a@a.a"}},

            })
        {
            _Controller = new UserController(base._repo);
        }

        [TestCase(_existingDummy, "123", null)]
        [TestCase(_newDummy, "456", "Zsanett Horváth")]
        public void Register_RegisterVM_ReturnsBool(string dummyUserName, string password, string? expectation)
        {
            // Arrange
            this.TestRegistration(dummyUserName, password);
            
            // Act
            UserProfileVM result = _Controller.Register();

            // Assert
            Assert.AreEqual(expectation, result.Username);
        }

        [TestCase("Albert Einstein", "456")]
        public void Register_ShouldCreateEntity(string dummyUserName, string password)
        {
            // Arrange
            this.TestRegistration(dummyUserName, password);

            // Act
            _Controller.Register();

            // Assert
            IEnumerable<User> users = base._repo.GetAllEntities();
            User userMock = users.Select(user => user).Where(user => user.UserName.Equals(dummyUserName)).ToArray()[0];

            Assert.AreEqual(dummyUserName, userMock.UserName);
        }

        private void TestRegistration(string dummyUserName, string password)
        {
            RegisterVM registerDummy = new RegisterVM();
            registerDummy.UserName = dummyUserName;
            registerDummy.Password = password;
            
            var controllerContext = new ControllerContext()
            {
                HttpContext = this.CreateHttpContext<RegisterVM>(registerDummy)
            };

            _Controller.ControllerContext = controllerContext;
        }

        private HttpContext CreateHttpContext<T>(T content)
        {
            HttpContext stubHttpContext = Substitute.For<HttpContext>();
            StubHttpSession stubSession = new StubHttpSession();
            
            stubSession["sessionId"] = "test";
            stubHttpContext.Session.Returns(stubSession);

            var stream = new MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(content)));

            stubHttpContext.Request.Body.Returns(stream);
            stubHttpContext.Request.ContentLength.Returns(stream.Length);

            return stubHttpContext;
        }

    }

}