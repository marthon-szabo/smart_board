using System;
using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLTaskRepository : SQLRepositoryBase<Task>, ITaskRepository
    {
        private readonly IColumnRepository _columnRepo;

        public SQLTaskRepository(AppDbContext context, IColumnRepository columnRepo)
            : base(context)
        {
            _columnRepo = columnRepo;
        }

        public IEnumerable<Task> GetTasksByColumnId(string columnId)
        {

            IEnumerable<Task> tasks = _context.Tasks
                .Select(task => task)
                .Where(task => task.ColumnId.Equals(columnId));

            return tasks;
        }
    }
}