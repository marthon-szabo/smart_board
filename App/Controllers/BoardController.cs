using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class BoardController : Controller
    {

        private readonly IBoardRepository _boardRepo;

        public BoardController(IBoardRepository boardRepo)
        {
            _boardRepo = boardRepo;
        }

        [HttpGet("boards/${user}/all")]
        public IEnumerable<Board> GetAllBoards(string userName)
        {
            return _boardRepo.GetAllBoardsByUsername(userName);
        }
    }
}