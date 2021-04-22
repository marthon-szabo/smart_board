using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Tasks")]
    public class Task
    {
        [Column("task_id")]
        public string Id { get; set; }
        
        [Column("column_id")]
        public string ColumnId { get; set; }

        [Column("task_name")]
        public string TaskName { get; set; }

        [Column("deadline")]
        public DateTime Deadline { get; set; }

         [Column("is_done")]
        public int IsDone { get; set; }

         [Column("task_description")]
        public string Description { get; set; }

        
    }
}