using System.Collections.Generic;
using App.Models.Entities;
using App.Models.ViewModels;

namespace App.Services.Repositories.Interfaces
{
    public interface IColumnRepository : IGeneralRepository<Column>
    {
         IEnumerable<Column> GetColumnsByColumnVM(ColumnVM columnVM);
         IEnumerable<Column> GetColumnsByBoardName(string boardName);
         Column CreatColumnByColumnVM(ColumnVM columnVM);
    }
}