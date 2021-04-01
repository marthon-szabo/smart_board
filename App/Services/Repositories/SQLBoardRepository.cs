using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLBoardRepository : SQLRepositoryBase<Board>, IBoardRepository
    {
        private readonly IUsersBoardsRepository _UsersBoardsRepo;
        private readonly IUserRepository _UserRepo;

        public SQLBoardRepository(AppDbContext context, IUsersBoardsRepository usersBoardsRepo,
                                                        IUserRepository userRepo)
            : base(context)
        {
            _UsersBoardsRepo = usersBoardsRepo;
            _UserRepo = userRepo;
        }

        public IEnumerable<Board> GetAllBoardsByUsername(string username)
        {
            IEnumerable<UsersBoards> usersBoards = _UsersBoardsRepo.GetAllEntities();
            string id = _UserRepo.GetUserByUsername(username).UserId;
            return usersBoards.Where(userBoard => id.Equals(userBoard.UserId)).Select(userBoard => userBoard.Board);
        }
    }
}