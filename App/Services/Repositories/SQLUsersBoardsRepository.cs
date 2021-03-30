using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLUsersBoardsRepository : SQLRepositoryBase<UsersBoards>, IUsersBoardsRepository
    {
        public SQLUsersBoardsRepository(AppDbContext context)
            : base(context)
        {
            
        }
    }
}