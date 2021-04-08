using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("users_boards")]
    public class UsersBoards
    {
        [Key]
        [Column("users_boards_id")]
        public string UsersBoardsId { get; set; }

        [Column("board_id")]
        public string BoardId { get; set; }


        [Column("user_id")]
        public string UserId { get; set; }
    }
}