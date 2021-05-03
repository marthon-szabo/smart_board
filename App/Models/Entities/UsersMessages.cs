using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Users_Messages")]
    public class UsersMessages
    {
        [Column("users_messages_id")]
        [Required]
        public string Id { get; set; }

        [Column("user_id")]
        [Required]
        public string UserId { get; set; }

        [Column("message_id")]
        [Required]
        public string MessageId { get; set; }
        
        
        
    }
}