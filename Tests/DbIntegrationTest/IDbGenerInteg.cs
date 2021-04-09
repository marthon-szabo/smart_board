using System.Collections.Generic;
using App.Models.Entities;

namespace Tests.DbIntegrationTest
{
    public interface IDbGenerInteg
    {
         void CreateTable(IDictionary<string, string[]> seedValues = null);
         void DropTable(AppDbContext context);
    }
}