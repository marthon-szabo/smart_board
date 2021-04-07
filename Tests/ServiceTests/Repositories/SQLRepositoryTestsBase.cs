using System;
using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests.DbIntegrationTest;

namespace Tests
{
    public abstract class SQLRepositoryTestsBase<TRepo, TEntity> : AppDbContext
        where TRepo : IGeneralRepository<TEntity>
    {
        private readonly IDbGenerInteg _integrationTester;

        private readonly IEnumerable<string>? _seedValues;

        protected TRepo _repo;

        protected Action AdditionalSetupOperations { get; set; }

        public SQLRepositoryTestsBase(IEnumerable<string> seedValues = null) : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(DbIntegrationTester.GetConnection())
                .Options)
        {
            _seedValues = seedValues;
            _repo = (TRepo)Activator.CreateInstance(typeof(TRepo), this, new SQLUsersBoardsRepository(this), new SQLUserRepository(this));
            _integrationTester = new GeneralIntegra<TRepo, TEntity>((IGeneralRepository<TEntity>)_repo, seedValues);
        }

        [SetUp]
        protected void SetUp()
        {
            _integrationTester.CreateTable(_seedValues);

            if (AdditionalSetupOperations != null)
            {
                AdditionalSetupOperations();
            }
        }

        [TearDown]
        protected void TearDown()
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