using System.Linq;
using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using App.Services.Factories.Interfaces;
using App.Services.Hubs.Interfaces;
using Microsoft.AspNetCore.SignalR;
using App.Services.Hubs;

namespace App.Controllers
{
    public class BoardController : Controller
    {

        private readonly IBoardRepository _boardRepo;
        private readonly IUserRepository _userRepo;
        private readonly IUsersBoardsRepository _usersBoardsRepo;
        protected readonly IColumnRepository _columnRepo;
        private readonly IChatGroupRepo _chatGroupRepo;
        private readonly IChatGroupFactory _chatGroupFactory;

        public BoardController(IBoardRepository boardRepo,
                                IUserRepository userRepo,
                                IUsersBoardsRepository userBoardsRepo,
                                IColumnRepository columnRepo,
                                IChatGroupRepo chatGroupRepo,
                                IChatGroupFactory chatGroupFactory)
        {
            _boardRepo = boardRepo;
            _userRepo = userRepo;
            _usersBoardsRepo = userBoardsRepo;
            _columnRepo = columnRepo;
            _chatGroupRepo = chatGroupRepo;
            _chatGroupFactory = chatGroupFactory;
        }

        [HttpGet("boards/{userId}")]
        public IEnumerable<Board> GetAllBoards(string userId)
        {
            return _boardRepo.GetAllBoardsByUserId(userId);
        }

        [HttpPost("boards/create-board")]
        public IEnumerable<Board> CreateNewBoard()
        {
            Stream stream = Request.Body;

            NewBoardVM newBoardVM = this.ReadRequestBody<NewBoardVM>(stream);
            ChatGroup newGroup = _chatGroupFactory.Create(newBoardVM.BoardId, newBoardVM.UserId);

            string id = IdGenerator.GenerateId();

            Board newBoard = new Board
            {
                BoardId = id,
                BoardName = newBoardVM.BoardName
            };
            newGroup.BoardId = id;

            _boardRepo.CreateEntity(newBoard);
            _chatGroupRepo.CreateEntity(newGroup);
            SaveBoardToConnectionTable(newBoard, newBoardVM.UserId);

            return _boardRepo.GetAllBoardsByUserId(newBoardVM.UserId);
        }

        [HttpPost("boards/delete-board")]
        public IEnumerable<Board> DeleteBoard()
        {
            Stream stream = Request.Body;

            NewBoardVM newBoardVM = this.ReadRequestBody<NewBoardVM>(stream);

            Board boardToDelete = _boardRepo.GetEntityById(newBoardVM.BoardId);
            ChatGroup chatGroup = _chatGroupRepo.GetAllEntities()
                .Select(cG => cG)
                .Where(cG => cG.BoardId.Equals(boardToDelete.BoardId))
                .ToArray()[0];

            UsersBoards usersBoardsToDelete = _usersBoardsRepo.GetUsersBoardsByBoardId(boardToDelete.BoardId);
            _usersBoardsRepo.DeleteEntityById(usersBoardsToDelete.UsersBoardsId);
            _chatGroupRepo.DeleteEntityById(chatGroup.Id);
            
            _boardRepo.DeleteEntityById(boardToDelete.BoardId);

            return _boardRepo.GetAllBoardsByUserId(newBoardVM.UserId);
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

        [HttpGet("boards/chat-group/{boardId}")]
        public ChatGroup GetChatGroup(string boardId)
        {
            ChatGroup chatGroup = _chatGroupRepo.GetAllEntities()
                .Select(chatGroup => chatGroup)
                .Where(chatGroup => chatGroup.BoardId.Equals(boardId))
                .ToArray()[0];

            return chatGroup;
        }

        [HttpGet("boards/columns/{boardid}")]
        public IEnumerable<Column> GetAllColumnsByBoardId(string boardid)
        {
            return _columnRepo.GetColumnsByBoardId(boardid);
        }

        private void SaveBoardToConnectionTable(Board newBoard, string userId)
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
            User currentUser = _userRepo.GetEntityById(userId);
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