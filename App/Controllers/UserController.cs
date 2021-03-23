using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
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

            return isExistent;
        }
    }
}