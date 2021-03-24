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
        public bool Register()
        {
            Stream stream = Request.Body;
                
            RegisterVM regVM = this.ReadRequestBody<RegisterVM>(stream);

            User? existing = _UserRepo.GetUserByUsername(regVM.UserName);

            bool isExistent = true;

            if(existing == null)
            {
                isExistent = false;

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

            return isExistent;
        }

        private T ReadRequestBody<T>(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;
            
            T requestVM = JsonConvert.DeserializeObject<T>(requestJson);

            return requestVM;
        }

        [HttpGet("user/token")]
        public string CreateToken()
        {
            return IdGenerator.GenerateId();
        }

        [HttpPost("user/login")]
        public bool Login()
        {
            Stream stream = Request.Body;

            LoginVM loginVM = this.ReadRequestBody<LoginVM>(stream);

            
        }
    }
}