using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IUsersBoardsRepository : IGeneralRepository<UsersBoards>
    {
        public UsersBoards? GetUsersBoardsByBoardId(string boardName);
    }
}