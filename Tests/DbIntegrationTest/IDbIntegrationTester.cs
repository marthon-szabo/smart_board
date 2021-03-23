using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace Tests.DbIntegrationTest
{
    public interface IDbIntegrationTester
    {
         void CreateTable();
         void DropTable(AppDbContext context, IEnumerable<User> users);
    }
}