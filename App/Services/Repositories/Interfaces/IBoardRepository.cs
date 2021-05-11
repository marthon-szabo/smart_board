using System.Collections.Generic;
using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IBoardRepository : IGeneralRepository<Board>
    {
        IEnumerable<Board> GetAllBoardsByUserId(string iserId);

        public Board? GetBoardByBoardName(string boardName);
    }
}