using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class TaskController : BoardController
    {
        private ITaskRepository _taskRepo;

        public TaskController(IColumnRepository columnRepo, ITaskRepository taskRepo, IBoardRepository boardRepo,
                                IUserRepository userRepo,
                                IUsersBoardsRepository userBoardsRepo)
            : base(boardRepo, userRepo, userBoardsRepo, columnRepo)
        {
            _taskRepo = taskRepo;
        }

        [HttpGet("boards/{columnName}/tasks")]
        public IEnumerable<Task> GetAllEntitiesByColumnName(string columnName)
        {
            return _taskRepo.GetTasksByColumnName(columnName);
        }

        [HttpPost("boards/{columnName}/tasks")]
        public IEnumerable<Task> CreateNewTask()
        {
            Stream stream = Request.Body;

            Task newTask = base.ReadRequestBody<Task>(stream);

            _taskRepo.CreateEntity(newTask);

            return _taskRepo.GetAllEntities();
        }

       [HttpPatch("boards/{columnName}/tasks")]
       public IEnumerable<Task> UpdateTask()
       {
            Stream stream = Request.Body;

            Task taskToUpdate = base.ReadRequestBody<Task>(stream);

            _taskRepo.UpdateEntityById(taskToUpdate);

            return _taskRepo.GetAllEntities();
       }
    }
}