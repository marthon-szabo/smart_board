using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using App.Controllers;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Tests.ControllerTests
{
    public class UserControllerTests : ControllerTestBase<UserController, SQLUserRepository, User>
    {
        private const string _newDummy = "Zsanett Horváth";
        private const string _existingDummy = "Márton Szabó";
        private HttpClient _Client; 

        public UserControllerTests() : base(new Dictionary<string, string[]>
            {
                {"UserId", new string[]{"MarthonSzabo"}},
                {"UserName", new string[]{"Márton Szabó"}},
                {"Password", new string[]{"MártonSzabó"}},
                {"Email", new string[]{"a@a.a"}},

            })
        {
            base._controller = new UserController(base._repo);
        }

        [TestCase(_existingDummy, "123", null)]
        [TestCase(_newDummy, "456", "Zsanett Horváth")]
        public void Register_RegisterVM_ReturnsBool(string dummyUserName, string password, string? expectation)
        {
            // Arrange
            this.TestRegistration(dummyUserName, password);
            
            // Act
            UserProfileVM result = base._controller.Register();

            // Assert
            Assert.AreEqual(expectation, result.Username);
        }

        [TestCase("Albert Einstein", "456")]
        public void Register_ShouldCreateEntity(string dummyUserName, string password)
        {
            // Arrange
            this.TestRegistration(dummyUserName, password);

            // Act
            base._controller.Register();

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
            
            base.CreatePostRequest(registerDummy);
        }

    }

}