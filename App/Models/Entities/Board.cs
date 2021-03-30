using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Boards")]
    public class Board
    {
        [Column("board_id")]
        public string BoardId { get; set; }

        [Column("board_name")]
        public string BoardName { get; set; }
        
        [Column("users_boards_id")]
        public string UsersBoardsId { get; set; }
    }
}