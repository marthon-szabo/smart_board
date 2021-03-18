using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLUserRepository : SQLRepositoryBase<User>, IUserRepository
    {

        public SQLUserRepository(AppDbContext context)
            : base(context)
        {
            
        }

    }
}