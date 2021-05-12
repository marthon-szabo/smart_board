using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public string UserId { get; set; }

        [Required]
        [Column("username", TypeName = "char(50)")]
        public string UserName { get; set; }
        
        [Required]
        [Column("password", TypeName = "char(250)")]
        public string Password { get; set; }
        
        [Required]
        [Column("email", TypeName = "char(250)")]
        public string Email { get; set; }

        [Column("taken_quests", TypeName = "char")]
        public string TakenQuests { get; set; }
        
        [Column("done_quests", TypeName = "char")]
        public string DoneQuests { get; set; }

        [Column("badges", TypeName = "char")]
        public string Badges { get; set; }

        [Column("profile_picture", TypeName = "char")]
        public string ProfilePicture { get; set; }
        
        
    }
}