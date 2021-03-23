using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using NSubstitute;

namespace Tests.DbIntegrationTest
{
    public class DbIntegrationTester : IDbIntegrationTester
    {
        private readonly IUserRepository _UserRepo;

        public DbIntegrationTester(IUserRepository userRepo) 
        {
            _UserRepo = userRepo;
        }

        public void CreateTable()
        {
             _UserRepo.CreateEntity(
                 new User
                {
                    UserId = "Test1",
                    UserName = "Márton Szabó",
                    Password = "12345",
                    Email = "stub@stub.com",
                }
            );
        }

        public void DropTable(AppDbContext context, IEnumerable<User> users)
        {
            context.Users.RemoveRange(users.ToArray());
            _UserRepo.Save();
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