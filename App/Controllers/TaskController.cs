using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class TaskController : Controller
    {
        private readonly IColumnRepository _columnRepo;
        private ITaskRepository _taskRepo;

        public TaskController(IColumnRepository columnRepo, ITaskRepository taskRepo)
        {
            _columnRepo = columnRepo;
            _taskRepo = taskRepo;
        }

        [HttpGet("boards/{columnName}/tasks")]
        public void GetAllEntitiesByColumnName(string columnName)
        {

        }
    }
}