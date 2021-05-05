using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Users_chat_messages")]
    public class UsersChatMessages
    {
        [Column("users_messages_id")]
        [Required]
        public string Id { get; set; }

        [Column("sender_id")]
        [Required]
        public string SenderId { get; set; }
        
        [Column("reciever_id")]
        [Required]
        public string RecieverId { get; set; }

        [Column("message_id")]
        [Required]
        public string MessageId { get; set; }
        
        
        
    }
}