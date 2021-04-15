using System.Collections.Generic;
using App.Models.Entities;
using App.Models.ViewModels;

namespace App.Services.Repositories.Interfaces
{
    public interface IColumnRepository : IGeneralRepository<Column>
    {
         IEnumerable<Column> GetColumnsByColumnVM(ColumnVM columnVM, IBoardRepository boardRepo);
         Column CreatColumnByColumnVM(ColumnVM columnVM, IBoardRepository boardRepo);
    }
}