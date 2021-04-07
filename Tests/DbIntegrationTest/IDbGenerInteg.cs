using System.Collections.Generic;
using App.Models.Entities;

namespace Tests.DbIntegrationTest
{
    public interface IDbGenerInteg
    {
         void CreateTable(IEnumerable<string> seedValues = null);
    }
}