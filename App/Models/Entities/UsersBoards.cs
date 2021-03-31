using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("users_boards")]
    public class UsersBoards
    {
        [Column("users_boards_id")]
        public string UsersBoardsId { get; set; }

        [Column("board_id")]
        public string BoardId { get; set; }


        [Column("user_id")]
        public string UserId { get; set; }

        public User User { get; set; }
        public Board Board { get; set; }
    }
}