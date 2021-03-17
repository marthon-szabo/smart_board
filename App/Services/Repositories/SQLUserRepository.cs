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
        
        public void CreateEntity(User entity)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEntityById(string id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<User> GetAllEntities()
        {
            throw new System.NotImplementedException();
        }

        public User GetEntityById(string id)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateEntityById(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}