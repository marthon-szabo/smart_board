using System.Collections.Generic;
using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IBoardRepository : IGeneralRepository<Board>
    {
        IEnumerable<Board> GetAllBoardsByUsername(string username);

        public Board? GetBoardByBoardName(string boardName);
    }
}