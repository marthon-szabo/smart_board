using System.Linq;
using App.Controllers;
using App.Models.Entities;
using App.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    public class TaskControllerTests : ControllerTestBase<TaskController, SQLTaskRepository, Task>
    {

        public TaskControllerTests()
        {
            base.AdditionalSetupOperations = () => 
            {
                base.Database.ExecuteSqlRaw("INSERT INTO Columns VALUES('test', 'testBoard', 'Test column')");
                base.Database.ExecuteSqlRaw("INSERT INTO Tasks ('task_id', 'task_name') VALUES ('testTask', 'Test task')");
            };
        }

        [Test]
        public void GetAllEntitiesByColumnName_ColumnName_ReturnsIEnumerable()
        {
            // Assert
            string columnName = "Test column";
            string expected = "Test task";

            // Act
            string result = _controller.GetAllEntitiesByColumnName(columnName).ToArray()[0].TaskName;

            // Assert
            Assert.AreEqual(expected, result);    
        }
    }
}