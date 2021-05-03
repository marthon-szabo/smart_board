using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Messages")]
    public class Message
    {
        [Column("message_id")]
        [Required]
        public string Id { get; set; }

        [Column("content")]
        [Required]
        public string Content { get; set; }
        
        [Column("message_date")]
        public DateTime Date { get; set; }
        
    }
}