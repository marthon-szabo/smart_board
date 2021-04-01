using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLBoardRepository : SQLRepositoryBase<Board>, IBoardRepository
    {
        private readonly IUsersBoardsRepository _UsersBoardsRepo;

        public SQLBoardRepository(AppDbContext context, IUsersBoardsRepository usersBoardsRepo)
            : base(context)
        {
            _UsersBoardsRepo = usersBoardsRepo;
        }

        public IEnumerable<Board> GetAllBoardsByUsername(string username)
        {
            IEnumerable<UsersBoards> usersBoards = _UsersBoardsRepo.GetAllEntities();

            return usersBoards.Where(userBoard => username.Equals(userBoard.UserId)).Select(userBoard => userBoard.Board);
        }
    }
}