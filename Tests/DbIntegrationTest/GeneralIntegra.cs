using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NSubstitute;

namespace Tests.DbIntegrationTest
{
    public class GeneralIntegra<TRepo, TEntity> : IDbGenerInteg
    {
        private readonly IGeneralRepository<TEntity> _repo;
        private readonly IEnumerable<string>? _seedValues;


        public GeneralIntegra(IGeneralRepository<TEntity> repo, IEnumerable<string> seedValues = null) 
        {
            _repo = repo;
        }

        public void CreateTable(IEnumerable<string> seedValues = null)
        {
            TEntity dummyEntity = (TEntity)Activator.CreateInstance(typeof(TEntity));
            
            if(_seedValues != null)
            {
                Type type = typeof(TEntity); 
                PropertyInfo[] propInfo = type.GetProperties();

                int propertyNumber = propInfo.Count();
                int valueNumber = _seedValues.Count();

                for(int i = 0; i < valueNumber; i++)
                {
                    
                    if(i % propertyNumber == 0 && i > 0)
                    {   
                        _repo.CreateEntity(dummyEntity);
                        dummyEntity = (TEntity)Activator.CreateInstance(typeof(TEntity));
                    }

                    propInfo[i % propertyNumber].SetValue(dummyEntity, _seedValues.ToArray()[i]);
                }
            }

            

            //  _Repo.CreateEntity(
            //      new User
            //     {
            //         UserId = "Test1",
            //         UserName = "Márton Szabó",
            //         Password = "12345",
            //         Email = "stub@stub.com",
            //     }
            // );
        }

        public void DropTable(AppDbContext context)
        {
             
            PropertyInfo[] propInfoes = context.GetType().GetProperties();
            
            foreach(PropertyInfo propInfo in propInfoes)
            {
                propInfo.SetValue(context, null);
            }

            _repo.Save();
        }

        public static string GetConnection()
        {
            IConfiguration configurationStub = Substitute.For<IConfiguration>();
            configurationStub["AppDb:ConnectionStrings:TestDbConnection"] = "Filename=/home/mrthn_sz4bo/Documents/repos/SmartBoard/Tests/sm_test_db.db";
            
            string connection = configurationStub["AppDb:ConnectionStrings:TestDbConnection"];

            return connection;

        }
    }
}