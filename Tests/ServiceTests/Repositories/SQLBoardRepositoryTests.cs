using System.Linq;
using System.Globalization;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using App.Services.Repositories;

namespace Tests
{
    public class SQLBoardRepositoryTests : SQLRepositoryTestsBase<SQLBoardRepository, Board>
    {
        private static string[] seedValues = new string[4]
        {
            "TestBoard1", "Test board 1",
            "TestBoard2", "Test board 2"
        };

        public SQLBoardRepositoryTests() : base(seedValues)
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO UsersBoards VALUES('TestUsersBoards', 'TestBoard1', 'TestUser1')");
                base.Database.ExecuteSqlRaw("INSERT INTO users (user_id, username, password, email) VALUES('TestUser1', 'Dummy User', 'test', 'a@c.c')");
            };

            base.AdditionalTearDownOperations = () =>
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
            };
        }

        [Test]
        public void GetAllBoardsByUsername_Username_ReturnsBoards()
        {
            // Arrange
            string expected = "TestBoard1";

            // Act
            string result = base._repo.GetAllBoardsByUsername("Dummy User").ToArray()[0].BoardName;

            // Assert
            Assert.AreEqual(expected, result);
        }
    }
}