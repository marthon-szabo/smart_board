using System.Collections.Generic;
using App.Models.Entities;

namespace App.Services.Hubs.Interfaces
{
    public interface IChatClient
    {
        System.Threading.Tasks.Task ReceiveMessage(ChatMessage message);
        System.Threading.Tasks.Task SendAsync(string group, ChatMessage message);
        System.Threading.Tasks.Task SendMessagesAsync(string group, IEnumerable<ChatMessage> message);
        System.Threading.Tasks.Task JoinGroup(string group);
    }
}