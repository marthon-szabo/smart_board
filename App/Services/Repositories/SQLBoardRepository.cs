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
            string id = _UserRepo.GetUserByUsername(username).UserId;
            IEnumerable<string> boardIds = _UsersBoardsRepo.GetAllEntities().Where(uB => uB.UserId.Equals(id)).Select(uB => uB.BoardId);
            

            return this.GetAllEntities().Where(b => boardIds.Contains(b.BoardId)).Select(b => b);
        }
    }
}