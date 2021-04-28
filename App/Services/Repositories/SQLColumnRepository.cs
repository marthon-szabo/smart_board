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
        private readonly IBoardRepository _boardRepo;

        public SQLColumnRepository(AppDbContext context, IBoardRepository boardRepo)
            : base(context)
        {
            _boardRepo = boardRepo;
        }

        public Column CreatColumnByColumnVM(ColumnVM columnVM)
        {

            Column newColumn = new Column()
            {
                Id = columnVM.ColumnId,
                BoardId = columnVM.BoardId,
                Name = columnVM.ColumnName
            };

            return newColumn;
        }

        public Column GetColumnByColumnName(string columnName)
        {
            return _context.Columns.Select(col => col).Where(col => col.Name.Equals(columnName)).ToArray()[0];
        }

        public IEnumerable<Column> GetColumnsByBoardId(string boardId)
        {
            return _context.Columns.Select(col => col).Where(col => col.BoardId.Equals(boardId));
        }

        public IEnumerable<Column> GetColumnsByColumnVM(ColumnVM columnVM)
        {
            Board board = this.GetBoard(columnVM);
            
            return base.GetAllEntities().Select(col => col).Where(col => col.BoardId.Equals(board.BoardId));
        }

        private Board GetBoard(ColumnVM columnVM)
        {
            return _boardRepo.GetEntityById(columnVM.BoardId);
        }
    }
}