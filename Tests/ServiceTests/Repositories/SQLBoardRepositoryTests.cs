using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using NUnit.Framework;

namespace Tests
{
    public class SQLBoardRepositoryTests : SQLRepositoryTestsBase<IBoardRepository, Board>
    {
        private static string[] seedValues = new string[4]
        {
            "TestBoard1", "Test board 1",
            "TestBoard2", "Test board 2"
        };

        public SQLBoardRepositoryTests() : base(seedValues)
        {
        }

        [Test]
        public void GetAllBoardsByUsername_Username_ReturnsBoards()
        {
            // Act
            

        }
    }
}