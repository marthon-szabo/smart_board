using System;
using System.Collections.Generic;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.TestDbServices;

namespace Tests
{
    public abstract class SQLRepositoryTestsBase<TRepo, TEntity> : TestDbService<TRepo, TEntity>
        where TRepo : IGeneralRepository<TEntity>
    {
        private readonly IDictionary<string, string[]>? _seedValues;

        private IDictionary<string, Object> _repositories;

        protected TRepo _repo;

        protected Action AdditionalSetupOperations { get; set; }

        public SQLRepositoryTestsBase(IDictionary<string, string[]> seedValues = null)
        {
            _seedValues = seedValues;
            this.InitializeRepoDict();

            _repo = (TRepo)_repositories[typeof(TRepo).Name];
            base._repo = (IGeneralRepository<TEntity>)_repo;
        }

        [SetUp]
        protected void SetUp()
        {
            base.CreateTable(_seedValues);


            if (AdditionalSetupOperations != null)
            {
                AdditionalSetupOperations();
            }
        }

        [TearDown]
        protected virtual void TearDown()
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

            base.DropTable(this);

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

        private void InitializeRepoDict()
        {
            IUserRepository userRepo = new SQLUserRepository(this);
            IUsersBoardsRepository usersBoardsRepo = new SQLUsersBoardsRepository(this);
            IBoardRepository boardRepo = new SQLBoardRepository(this, usersBoardsRepo, userRepo);
            IColumnRepository columnRepo = new SQLColumnRepository(this, boardRepo);
            ITaskRepository taskRepo = new SQLTaskRepository(this, columnRepo);

            _repositories = new Dictionary<string, Object>()
            {
                { "SQLBoardRepository", boardRepo },
                { "SQLUsersBoardsRepository", usersBoardsRepo },
                { "SQLUserRepository", userRepo },
                { "SQLTaskRepository", taskRepo}
            };
        }
    }
}