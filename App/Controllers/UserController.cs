using System.Collections.Generic;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepo;

        public UserController(IUserRepository repo)
        {
            _UserRepo = repo;
        }

        public bool Register(RegisterVM regVM)
        {
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

                User newUser = new User
                {
                    UserName = regVM.UserName,
                    Email = regVM.Email,
                    Password = hashedPassword
                };

                _UserRepo.CreateEntity(newUser);
            }

            return isExistent;
        }
    }
}