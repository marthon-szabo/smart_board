using System;
using System.Collections.Generic;
using System.Reflection;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NSubstitute;

namespace Tests.TestDbServices
{
    public class TestDbService<TRepo, TEntity> : AppDbContext, ITestDbService
    {
        protected IGeneralRepository<TEntity> _repo;

        public TestDbService() : base(new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(TestDbService<TRepo, TEntity>.GetConnection())
                .Options) 
        {
        }

        public void CreateTable(IDictionary<string, string[]> seedValues = null)
        {
            TEntity dummyEntity = (TEntity)Activator.CreateInstance(typeof(TEntity));
            
            if(seedValues != null)
            {
                Type type = typeof(TEntity); 
                PropertyInfo[] propInfo = type.GetProperties();
                
                byte entityNumber = (byte)(seedValues.Values.Count / seedValues.Keys.Count);

                for(byte entityCounter = 0; entityCounter < entityNumber; entityCounter++)
                {
                    foreach(string key in seedValues.Keys)
                    {
                        type.GetProperty(key).SetValue(dummyEntity, seedValues[key][entityCounter]);
                    }

                    _repo.CreateEntity(dummyEntity);
                    dummyEntity = (TEntity)Activator.CreateInstance(typeof(TEntity));
                }
            }
        }

        public static string GetConnection()
        {
            IConfiguration configurationStub = Substitute.For<IConfiguration>();
            configurationStub["AppDb:ConnectionStrings:TestDbConnection"] = "Filename=/home/mrthn_sz4bo/Documents/repos/SmartBoard/Tests/sm_test_db.db";
            
            string connection = configurationStub["AppDb:ConnectionStrings:TestDbConnection"];

            return connection;
        }

        public void DropTable(AppDbContext context)
        {

            foreach(var entity in _repo.GetAllEntities())
            {
                context.Remove(entity);
            }

            context.SaveChanges();
        }
    }
}