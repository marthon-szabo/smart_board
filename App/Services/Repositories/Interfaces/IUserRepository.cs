using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IUserRepository : IGeneralRepository<User>
    {
        #region nullable
        User? GetUserByUsername(string username);
        #endregion
    }   
}