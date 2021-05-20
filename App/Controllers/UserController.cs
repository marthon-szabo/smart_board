using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace App.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _UserRepo;
        private readonly IUsersBoardsRepository _ConnectionRepo;

        public UserController(IUserRepository repo, IUsersBoardsRepository connectionRepo)
        {
            _UserRepo = repo;
            _ConnectionRepo = connectionRepo;
        }

        [HttpPost("user/register")]
        public UserProfileVM Register()
        {
            Stream stream = Request.Body;
                
            RegisterVM regVM = this.ReadRequestBody<RegisterVM>(stream);

            User? existing = _UserRepo.GetUserByUsername(regVM.UserName);

            UserProfileVM newProfile;

            if(existing != null)
            {
                newProfile = new UserProfileVM();
            }
            else
            {
                string hashedPassword = PasswordOperator.HashMe(regVM.Password);
                string id = IdGenerator.GenerateId();

                User newUser = new User
                {
                    UserId = id,
                    UserName = regVM.UserName,
                    Email = regVM.Email,
                    Password = hashedPassword
                };

                newProfile = this.GetProfile(newUser);

                _UserRepo.CreateEntity(newUser);

                HttpContext.Session.SetString("sessionId", IdGenerator.GenerateId());
            }

            return newProfile;
        }

        private T ReadRequestBody<T>(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;
            
            T requestVM = JsonConvert.DeserializeObject<T>(requestJson);

            return requestVM;
        }

        [HttpGet("user/token")]
        public JsonResult CreateToken()
        {
            return Json(IdGenerator.GenerateId());
        }

        [HttpPost("user/login")]
        [RequireHttps]
        public UserProfileVM Login()
        {
            Stream stream = Request.Body;

            LoginVM loginVM = this.ReadRequestBody<LoginVM>(stream);

            User? existingUser = _UserRepo.GetUserByUsername(loginVM.Username);

            if(existingUser == null || !PasswordOperator.ValidateMe(existingUser.Password, loginVM.Password))
            {
                return new UserProfileVM();
            }
            else
            {
                HttpContext.Session.SetString("sessionId", IdGenerator.GenerateId());
                
                return this.GetProfile(existingUser);
            }
            
        }

        [HttpPost("user/change-password")]
        [RequireHttps]
        public ActionResult ChangePassword ()
        {
            Stream stream = Request.Body;

            ChangePasswordVM changeable = this.ReadRequestBody<ChangePasswordVM>(stream);

            User user = _UserRepo.GetUserByUsername(changeable.Username);

            bool isSame = PasswordOperator.ValidateMe(user.Password, changeable.NewPassword);
            bool isValid = PasswordOperator.ValidateMe(user.Password, changeable.OldPassword);

            if (isSame || !isValid)
            {
                return StatusCode(417);
            }
            else
            {
                string hashedPassword = PasswordOperator.HashMe(changeable.NewPassword);
                user.Password = hashedPassword;
                _UserRepo.UpdateEntityById(user);
                return Ok();
            }
            
        }

        [HttpGet("user/available-users/{userId}")]
        [RequireHttps]
        public List<string> GetAddableUsers(string userId)
        {
            IEnumerable<User> users = _UserRepo.GetAllEntities();

            IEnumerable<UsersBoards> connections = _ConnectionRepo.GetAllEntities();

            var connectionsWithCurrentTable = connections.Where(connection => connection.BoardId.Equals(userId));

            List<string> userIds = new List<string>();
            
            foreach (var connection in connectionsWithCurrentTable)
            {
                userIds.Add(connection.UserId);
            }

            var usersAlreadyAdded = users.Where(user => userIds.Contains(user.UserId));
            
            var resultUsers = users.Except(usersAlreadyAdded);

            List<string> result = new List<string>();

            foreach (var resultUser in resultUsers)
            {
                result.Add(resultUser.UserName);
            }

            return result;
        }


        [HttpPost("user/change-userdata")]
        [RequireHttps]
        public UserProfileVM ChangeUserData()
        {
            Stream stream = Request.Body;

            ChangeUserDataVM newData = this.ReadRequestBody<ChangeUserDataVM>(stream);

            User user = _UserRepo.GetUserByUsername(newData.Username);

            user.UserName = newData.NewUsername;
            user.Email = newData.NewEmail;
            _UserRepo.UpdateEntityById(user);

            return this.GetProfile(user);
        }

            private UserProfileVM GetProfile(User user)
        {
            return new UserProfileVM
            {
                Username = user.UserName,
                Email = user.Email,
                Badges = user.Badges,
                TakenQuests = user.TakenQuests,
                DoneQuests = user.DoneQuests
            };
        }
    }
}