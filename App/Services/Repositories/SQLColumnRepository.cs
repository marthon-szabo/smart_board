using System;
using System.Linq;
using System.Collections.Generic;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;

namespace App.Services.Repositories
{
    public class SQLColumnRepository : SQLRepositoryBase<Column>, IColumnRepository
    {
        public SQLColumnRepository(AppDbContext context)
            : base(context)
        {
        }

        public Column CreatColumnByColumnVM(ColumnVM columnVM,  IBoardRepository boardRepo)
        {
            Board board = this.GetBoard(columnVM, boardRepo);

            Column newColumn = new Column
            {
                Id = IdGenerator.GenerateId(),
                BoardId = board.BoardId,
                Name = columnVM.ColumnName
            };

            return newColumn;
        }

        public IEnumerable<Column> GetColumnsByColumnVM(ColumnVM columnVM, IBoardRepository boardRepo)
        {
            Board board = this.GetBoard(columnVM, boardRepo);
            
            return base.GetAllEntities().Select(col => col).Where(col => col.BoardId.Equals(board.BoardId));
        }

        private Board GetBoard(ColumnVM columnVM, IBoardRepository boardRepo)
        {
            return boardRepo.GetBoardByBoardName(columnVM.BoardName);
        }
    }
}