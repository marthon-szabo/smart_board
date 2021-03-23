using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepo;

        public User(IUserRepository repo)
        {
            _UserRepo = repo;
        }

        public bool Register(User )
        {
            IEnumerable<User> users = _UserRepo.GetAllEntities();

            User? 
        }
    }
}