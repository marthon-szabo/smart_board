using System;

namespace App.Models.ViewModels
{
    public struct ChatMessageVM
    {
        public string MessageId { get; set; }
        public string SenderId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string ProfilePicture { get; set; }
        
           
    }
}