using App.Models.Entities;

namespace App.Services.Hubs.Interfaces
{
    public interface IChatClient
    {
        System.Threading.Tasks.Task ReceiveMessage(ChatMessage message);
    }
}