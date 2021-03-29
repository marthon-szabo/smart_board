using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    public class Board
    {
        [Column("board_id")]
        public string BoardId { get; set; }

        [Column("board_name")]
        public string BoardName { get; set; }
    }
}