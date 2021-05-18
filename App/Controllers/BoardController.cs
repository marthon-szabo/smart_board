using System.Linq;
using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace App.Controllers
{
    public class BoardController : Controller
    {

        private readonly IBoardRepository _boardRepo;
        private readonly IUserRepository _userRepo;
        private readonly IUsersBoardsRepository _usersBoardsRepo;
        protected readonly IColumnRepository _columnRepo;

        public BoardController(IBoardRepository boardRepo,
                                IUserRepository userRepo,
                                IUsersBoardsRepository userBoardsRepo,
                                IColumnRepository columnRepo)
        {
            _boardRepo = boardRepo;
            _userRepo = userRepo;
            _usersBoardsRepo = userBoardsRepo;
            _columnRepo = columnRepo;
        }

        [HttpGet("boards/{userName}")]
        public IEnumerable<Board> GetAllBoards(string userName)
        {
            return _boardRepo.GetAllBoardsByUsername(userName);
        }

        [HttpPost("boards/create-board")]
        public IEnumerable<Board> CreateNewBoard()
        {
            Stream stream = Request.Body;

            NewBoardVM newBoardVM = this.ReadRequestBody<NewBoardVM>(stream);

            string id = IdGenerator.GenerateId();

            Board newBoard = new Board
            {
                BoardId = id,
                BoardName = newBoardVM.BoardName
            };

            _boardRepo.CreateEntity(newBoard);
            SaveBoardToConnectionTable(newBoard, newBoardVM.UserName);

            return _boardRepo.GetAllBoardsByUsername(newBoardVM.UserName);
        }

        [HttpPost("boards/delete-board")]
        public IEnumerable<Board> DeleteBoard()
        {
            Stream stream = Request.Body;

            NewBoardVM newBoardVM = this.ReadRequestBody<NewBoardVM>(stream);

            Board boardToDelete = _boardRepo.GetBoardByBoardName(newBoardVM.BoardName);

            UsersBoards usersBoardsToDelete = _usersBoardsRepo.GetUsersBoardsByBoardId(boardToDelete.BoardId);
            _usersBoardsRepo.DeleteEntityById(usersBoardsToDelete.UsersBoardsId);

            
            _boardRepo.DeleteEntityById(boardToDelete.BoardId);

            return _boardRepo.GetAllBoardsByUsername(newBoardVM.UserName);
        }

        [HttpPost("boards/columns")]
        public IEnumerable<Column> CreateColumn()
        {
            Stream stream = Request.Body;
            ColumnVM columnVM = this.ReadRequestBody<ColumnVM>(stream);
            
            columnVM.ColumnId = IdGenerator.GenerateId();

            _columnRepo.CreateEntity(_columnRepo.CreatColumnByColumnVM(columnVM));

            return _columnRepo.GetColumnsByColumnVM(columnVM);   

        }

        [HttpDelete("boards/columns")]
        public IEnumerable<Column> DeletColumn()
        {
            Stream stream = Request.Body;
            ColumnVM columnVM = this.ReadRequestBody<ColumnVM>(stream);

            Column[] column = _columnRepo.GetAllEntities()
                .Select((col) => col)
                .Where(col => col.BoardId.Equals(columnVM.BoardId))
                .ToArray();

            _columnRepo.DeleteEntityById(column[0].Id);

            return _columnRepo.GetColumnsByColumnVM(columnVM);
        }

        [HttpPatch("boards/columns")]
        public IEnumerable<Column> UpdateColumnById()
        {
            Stream stream = Request.Body;
            ColumnVM columnVM = this.ReadRequestBody<ColumnVM>(stream);

            _columnRepo.UpdateEntityById(_columnRepo.CreatColumnByColumnVM(columnVM));

            return _columnRepo.GetAllEntities();
        }

        [HttpGet("boards/columns/{boardid}")]
        public IEnumerable<Column> GetAllColumnsByBoardId(string boardid)
        {
            return _columnRepo.GetColumnsByBoardId(boardid);
        }

        [HttpPost("boards/add-board")]
        [RequireHttps]
        public ActionResult AddExistingBoardToUser()
        {
            Stream stream = Request.Body;

            ExtendBoardVM newData = this.ReadRequestBody<ExtendBoardVM>(stream);

            Board board = _boardRepo.GetBoardByBoardName(newData.BoardName);

            SaveBoardToConnectionTable(board, newData.NewUser);

            return Ok();
        }

        private void SaveBoardToConnectionTable(Board newBoard, string userName)
        {
            User currentUser = _userRepo.GetUserByUsername(userName);
            string id = IdGenerator.GenerateId();
            UsersBoards usersBoards = new UsersBoards
            {
                BoardId = newBoard.BoardId,
                UserId = currentUser.UserId,
                UsersBoardsId = id
            };

            _usersBoardsRepo.CreateEntity(usersBoards);

        }

        private T ReadRequestBody<T>(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;

            T requestVM = JsonConvert.DeserializeObject<T>(requestJson);

            return requestVM;
        }
    }
}