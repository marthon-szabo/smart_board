using System;
using System.Collections.Generic;
using App.Models.Entities;
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
        protected Action AdditionalTearDownOperations { get; set; }

        public SQLRepositoryTestsBase(IEnumerable<string> seedValues = null) : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(DbIntegrationTester.GetConnection())
                .Options)
        {
            _seedValues = seedValues;
            _repo = (TRepo)Activator.CreateInstance(typeof(TRepo), this);
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
            _integrationTester.DropTable(this);

            if (AdditionalTearDownOperations != null)
            {
                AdditionalTearDownOperations();
            }
        }
    }
}