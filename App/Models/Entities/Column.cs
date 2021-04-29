using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Columns")]
    public class Column
    {
        [Column("column_id")]
        public string Id { get; set; }
        
        [Column("board_id")]
        public string BoardId { get; set; }
        
        [Column("column_name")]
        public string Name { get; set; }
    }
}