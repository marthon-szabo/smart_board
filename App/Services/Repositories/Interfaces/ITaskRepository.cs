using System.Collections.Generic;

using App.Models.Entities;

namespace App.Services.Repositories.Interfaces
{
    public interface ITaskRepository : IGeneralRepository<Task>
    {
        IEnumerable<Task> GetTasksByColumnName();
    }
}