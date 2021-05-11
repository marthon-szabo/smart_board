using System.Collections.Generic;
using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IUsersBoardsRepository : IGeneralRepository<UsersBoards>
    {
        UsersBoards? GetUsersBoardsByBoardId(string boardName);
        IEnumerable<UsersBoards> GetUsersBoardsByUserId(string userId);
    }
}