using System.Linq;
using System.Collections.Generic;
using App.Controllers;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Tests
{
    public class BoardControllerTests
    {
        [Test]
        public void GetAllBoards_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "Test board";
            
            IEnumerable<Board> dummyBoards = new Board[]
            {
                new Board
                {
                    BoardId = "TestId",
                    BoardName = "Test board"
                }
            };

            IBoardRepository stubBoardRepo = Substitute.For<IBoardRepository>();
            stubBoardRepo.GetAllBoardsByUsername("test").Returns(dummyBoards);

            BoardController bC = new BoardController(stubBoardRepo);

            // Act
            string result = bC.GetAllBoards("test").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }        
    }
}