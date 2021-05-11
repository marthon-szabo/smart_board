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

        public override System.Threading.Tasks.Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public System.Threading.Tasks.Task JoinGroup(string group)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }

        public System.Threading.Tasks.Task SendMessageToGroup(string groupName, ChatMessage message)
        {
            return Clients.Group(groupName).SendAsync("RecieveMessage", message);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}