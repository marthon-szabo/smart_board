using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLBoardRepository : SQLRepositoryBase<Board>, IBoardRepository
    {
        public SQLBoardRepository(AppDbContext context)
            : base(context)
        {
            
        }
    }
}