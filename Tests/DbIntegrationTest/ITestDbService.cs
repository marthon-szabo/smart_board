using System.Collections.Generic;
using App.Models.Entities;

namespace Tests.TestDbServices
{
    public interface ITestDbService
    {
         void CreateTable(IDictionary<string, string[]> seedValues = null);
         void DropTable(AppDbContext context);
    }
}