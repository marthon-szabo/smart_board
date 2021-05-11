using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using System.Collections.Generic;

namespace App.Services.Repositories
{
    public class SQLUsersBoardsRepository : SQLRepositoryBase<UsersBoards>, IUsersBoardsRepository
    {
        public SQLUsersBoardsRepository(AppDbContext context)
            : base(context)
        {
            
        }

        public UsersBoards? GetUsersBoardsByBoardId(string boardId)
        {
            IEnumerable<UsersBoards> usersBoards = this.GetAllEntities();

            foreach (UsersBoards usersBoard in usersBoards)
            {
                if (usersBoard.BoardId.Equals(boardId))
                {
                    return usersBoard;
                }
            }
            return null;
        }

        public IEnumerable<UsersBoards> GetUsersBoardsByUserId(string userId)
        {
            IEnumerable<UsersBoards> usersBoards = this.GetAllEntities();

            foreach (UsersBoards usersBoard in usersBoards)
            {
                if (usersBoard.UserId.Equals(userId))
                {
                    yield return usersBoard;
                }
            }
        }
    }
}