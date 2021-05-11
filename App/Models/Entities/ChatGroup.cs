using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Chat_groups")]
    public class ChatGroup
    {
        [Column("chat_groups_id")]
        [Required]
        public string Id { get; set; }
        
        [Column("user_id")]
        [Required]
        public string UserId { get; set; }
        
        [Column("board_id")]
        [Required]
        public string BoardId { get; set; }

        [Column("chat_message_id")]
        public string ChatMessageId { get; set; }

        [Column("group_name")]
        public string GroupName { get; set; }
    }
}