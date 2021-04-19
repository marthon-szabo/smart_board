using System;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLTaskRepository : SQLRepositoryBase<Task>, ITaskRepository
    {
        public SQLTaskRepository(AppDbContext context)
            : base(context)
        {
        }
    }
}