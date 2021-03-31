using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using NSubstitute;

namespace Tests.DbIntegrationTest
{
    public class UsersBoardsIntegrationTester
    {
        private readonly IUsersBoardsRepository _UsersBoardsRepo;

        public UsersBoardsIntegrationTester(IUsersBoardsRepository userRepo) 
        {
            _UsersBoardsRepo = userRepo;
        }

        public void CreateTable()
        {
             _UsersBoardsRepo.CreateEntity(
                 new UsersBoards
                {
                    UserId = "TestUser",
                    BoardId = "TestBoard",
                    UsersBoardsId = "UBTest"
                }
            );
        }

        public void DropTable(AppDbContext context, IEnumerable<UsersBoards> usersBoards)
        {
            context.UsersBoards.RemoveRange(usersBoards.ToArray());
            _UsersBoardsRepo.Save();
        }

        public static string GetConnection()
        {
            IConfiguration configurationStub = Substitute.For<IConfiguration>();
            configurationStub["AppDb:ConnectionStrings:TestDbConnection"] = "Filename=/home/mrthn_sz4bo/Documents/repos/SmartBoard/Tests/sm_test_db.db";
            
            string connection = configurationStub["AppDb:ConnectionStrings:TestDbConnection"];

            return connection;

        }
    }
}