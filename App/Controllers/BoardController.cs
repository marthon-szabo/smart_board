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

        public BoardController(IBoardRepository boardRepo)
        {
            _boardRepo = boardRepo;
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
            return _boardRepo.GetAllBoardsByUsername(newBoardVM.UserName);
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