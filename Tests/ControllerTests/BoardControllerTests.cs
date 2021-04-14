using System.Linq;
using System.Collections.Generic;
using App.Controllers;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using NSubstitute;
using NUnit.Framework;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Tests
{
    public class BoardControllerTests : SQLRepositoryTestsBase<SQLBoardRepository, Board>
    {

        private readonly SQLBoardRepository _boardRepo;

        public BoardControllerTests()
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard', 'First Board')");
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser', 'Dummy User', 'test', 'a@c.c')");
                base.Database.ExecuteSqlRaw("INSERT INTO Users_Boards VALUES('UBTest', 'TestBoard', 'TestUser')");
            };
        }

        [Test]
        public void GetAllBoards_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "First Board";
            
            

            IUserRepository stubUserRepo = Substitute.For<IUserRepository>();
            IUsersBoardsRepository stubUsersBoardsRepo = Substitute.For<IUsersBoardsRepository>();

            BoardController bC = new BoardController(base._repo, stubUserRepo, stubUsersBoardsRepo);

            // Act
            string result = bC.GetAllBoards("Dummy User").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }        
    }
}