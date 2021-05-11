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

        public IEnumerable<Board> GetAllBoardsByUserId(string userId)
        {
            IEnumerable<string> boardIds = _UsersBoardsRepo.GetAllEntities().Where(uB => uB.UserId.Equals(userId)).Select(uB => uB.BoardId);
            

            return this.GetAllEntities().Where(b => boardIds.Contains(b.BoardId)).Select(b => b);
        }

        public Board? GetBoardByBoardName(string boardName)
        {
            IEnumerable<Board> boards = this.GetAllEntities();

            foreach (Board board in boards.ToArray())
            {
                if (board.BoardName.Equals(boardName))
                {
                    return board;
                }
            }

            return null;
        }
    }
}