using App.Models.Entities;
using App.Services.Hubs.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace App.Services.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async System.Threading.Tasks.Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}