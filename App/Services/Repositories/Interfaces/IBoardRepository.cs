using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface IBoardRepository : IGeneralRepository<Board>
    {
        Board GetAllBoardsByUsername(string username);
    }
}