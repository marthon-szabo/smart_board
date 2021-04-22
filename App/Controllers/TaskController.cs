using System.Collections;
using System.Collections.Generic;
using System.IO;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public IEnumerable<Task> GetAllEntitiesByColumnName(string columnName)
        {
            return _taskRepo.GetTasksByColumnName(columnName);
        }

        [HttpPost("boards/{columnName}/tasks")]
        public IEnumerable<Task> CreateNewTask(string columnName)
        {
            Stream stream = Request.Body;

            Task newTask = ReadRequestBody<Task>(stream);
            string columnId = _columnRepo.GetColumnByColumnName(newTask.ColumnId).Id;
            
            newTask.ColumnId = columnId;
            _taskRepo.CreateEntity(newTask);

            return _taskRepo.GetAllEntities();
        }

       [HttpPatch("boards/{columnName}/tasks")]
       public IEnumerable<Task> UpdateTask()
       {
            Stream stream = Request.Body;

            Task taskToUpdate = ReadRequestBody<Task>(stream);

            _taskRepo.UpdateEntityById(taskToUpdate);

            return _taskRepo.GetAllEntities();
       }

        [HttpDelete("boards/{columnName}/tasks/{id}")]
        public IEnumerable<Task> DeleteTask(string id)
        {
            Stream stream = Request.Body;

            _taskRepo.DeleteEntityById(id);

            return _taskRepo.GetAllEntities();
        }

         private T ReadRequestBody<T>(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;

            T requestVM = JsonConvert.DeserializeObject<T>(requestJson);

            return requestVM;
        }
    }

}