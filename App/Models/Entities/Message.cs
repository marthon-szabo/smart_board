using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Messages")]
    public class Message
    {
        [Column("id")]
        [Required]
        public string Id { get; set; }
        
        [Column("user_id")]
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        public DateTime Date { get; set; }
        
    }
}