using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Chat_messages")]
    public class ChatMessage
    {
        [Column("message_id")]
        [Required]
        public string Id { get; set; }

        [Column("sender_id")]
        public string SenderId { get; set; }

        [Column("board_id")]
        [Required]
        public string BoardId { get; set; }
        
        [Column("sender_name")]
        [Required]
        public string SenderName { get; set; }

        [Column("content")]
        [Required]
        public string Content { get; set; }

        [Column("profile_picture")]
        public string ProfilePicture { get; set; }
        
        
        
        [Column("message_date")]
        public DateTime Date { get; set; }
    }
}