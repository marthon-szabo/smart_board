using System.Linq;
using System.Collections.Generic;
using App.Controllers;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using NSubstitute;
using NUnit.Framework;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using App.Models.ViewModels;

namespace Tests
{
    public class BoardControllerTests : ControllerTestBase<BoardController, SQLBoardRepository, Board>
    {

        private readonly SQLBoardRepository _boardRepo;

        private readonly IUserRepository _dummyUserRepo;
        private readonly IUsersBoardsRepository _dummyUsersBoardsRepo;
        private readonly IColumnRepository _columnRepo;

        private ColumnVM _columnVM = new ColumnVM
            {
                ColumnName = "Test Column",
                BoardName = "First Board"
            };


        public BoardControllerTests()
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard', 'First Board')");
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser', 'Dummy User', 'test', 'a@c.c')");
                base.Database.ExecuteSqlRaw("INSERT INTO Users_Boards VALUES('UBTest', 'TestBoard', 'TestUser')");
            };

            _boardRepo = base._repo;
            _columnRepo = new SQLColumnRepository(this);
            _dummyUserRepo = Substitute.For<IUserRepository>();
            _dummyUsersBoardsRepo = Substitute.For<IUsersBoardsRepository>();

            base._controller = new BoardController(_boardRepo, _dummyUserRepo, _dummyUsersBoardsRepo, _columnRepo);

        }

        [Test]
        public void GetAllBoards_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "First Board";
            
            // Act
            string result = base._controller.GetAllBoards("Dummy User").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }

        [Test]
        public void CreateColumn_ColumnVM_WritesDataToDb()
        {
            // Arrange
            string expected = _columnVM.ColumnName;

            base.CreatePostRequest<ColumnVM>(_columnVM);

            // Act
            base._controller.CreateColumn();

            // Assert
            string result = _columnRepo.GetAllEntities().ToArray()[0].Name;
            Assert.AreEqual(expected, result);

        }

        [Test]
        public void CreateColumn_ColumnVM_ReturnsIEnumerable()
        {
            // Arrange
            string expected = _columnVM.ColumnName;

            base.CreatePostRequest<ColumnVM>(_columnVM);

            // Act
            string result = base._controller.CreateColumn().ToArray()[0].Name;

            // Assert
            Assert.AreEqual(expected, result);

        }

        [Test]
        public void DeleteColumn_DeletesColumnFromDatabase()
        {
            // Arrange
            byte expected = 0;
            
            base.CreatePostRequest<ColumnVM>(_columnVM);
            base._controller.CreateColumn();

            // Act
            base.CreatePostRequest<ColumnVM>(_columnVM);
            base._controller.DeletColumn();

            // Assert
            byte result = (byte)_columnRepo.GetAllEntities().ToArray().Length;
            Assert.AreEqual(expected, result);
        }
    }
}