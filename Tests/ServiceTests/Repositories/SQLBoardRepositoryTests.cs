using System.Linq;
using System.Globalization;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using App.Services.Repositories;
using System.Collections.Generic;

namespace Tests
{
    public class SQLBoardRepositoryTests : SQLRepositoryTestsBase<SQLBoardRepository, Board>
    {
        public SQLBoardRepositoryTests() : base()
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser1', 'Dummy User', 'test', 'a@c.c')");
                base.Database.ExecuteSqlRaw("INSERT INTO Boards VALUES('TestBoard1', 'Test Board 1')");
                base.Database.ExecuteSqlRaw("INSERT INTO Users_Boards (users_boards_id, board_id, user_id) VALUES('TestUsersBoards', 'TestBoard1', 'TestUser1')");
            };
        }

        [Test]
        public void GetAllBoardsByUsername_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "Test Board 1";

            // Act
            string result = base._repo.GetAllBoardsByUsername("Dummy User").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }

        protected override void TearDown()
        {
            base.Database.ExecuteSqlRaw(@"
                    DROP TABLE IF EXISTS Users_Boards;
                    CREATE TABLE Users_Boards (
                        users_boards_id char PRIMARY KEY,
                        board_id CHAR NOT NULL,
                        user_id CHAR NOT NULL,
                        FOREIGN KEY(board_id) REFERENCES Boards(board_id),
                        FOREIGN KEY(user_id) REFERENCES Users(user_id)
                    );
                ");

                base.Database.ExecuteSqlRaw(@"
                    DROP TABLE IF EXISTS users;
                    CREATE TABLE users (
                        user_id TEXT PRIMARY KEY,
                        username char(50),
                        badges char,
                        done_quests char,
                        taken_quests char,
                        password char(250),
                        email char(250)
                    );
                ");

                base.Database.ExecuteSqlRaw(@"
                    DROP TABLE IF EXISTS Boards;
                    CREATE TABLE Boards (
                        board_id CHAR PRIMARY KEY,
                        board_name CHAR
                    );
                ");
        }
    }
}