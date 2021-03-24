using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace App.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _UserRepo;

        public UserController(IUserRepository repo)
        {
            _UserRepo = repo;
        }

        [HttpPost("user/register")]
        public JsonResult Register()
        {
            Stream stream = Request.Body;
                
            RegisterVM regVM = this.ReadRegisterRequestBody(stream);

            IEnumerable<User> users = _UserRepo.GetAllEntities();

            bool isExistent = false;

            foreach (User user in users)
            {
                if(user.UserName.Equals(regVM.UserName))
                {
                    isExistent = true;
                }
            }

            if(!isExistent)
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

                _UserRepo.CreateEntity(newUser);
            }

            return Json(isExistent);
        }

        private RegisterVM ReadRegisterRequestBody(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;
            
            RegisterVM requestVM = JsonConvert.DeserializeObject<RegisterVM>(requestJson);

            return requestVM;
        }

        [HttpGet("user/token")]
        public string CreateToken()
        {
            return IdGenerator.GenerateId();
        }
    }
}