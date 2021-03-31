using System.Collections.Generic;
using System.Linq;
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

        public User? GetUserByUsername(string username)
        {
            IEnumerable<User> users = this.GetAllEntities();

            foreach (User user in users.ToArray())
            {
                if(user.UserName.Equals(username))
                {
                    return user;
                }
            }

            return null;
        }
    }
}