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

        public BoardController(IBoardRepository boardRepo,
                                IUserRepository userRepo,
                                IUsersBoardsRepository userBoardsRepo)
        {
            _boardRepo = boardRepo;
            _userRepo = userRepo;
            _usersBoardsRepo = userBoardsRepo;
        }

        [HttpGet("boards/username={userName}")]
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