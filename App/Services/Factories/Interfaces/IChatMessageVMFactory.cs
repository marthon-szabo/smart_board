using App.Models.Entities;
using App.Models.ViewModels;

namespace App.Services.Factories.Interfaces
{
    public interface IChatMessageVMFactory
    {
        ChatMessageVM CreateByChatMessage(ChatMessage chatMessage);
    }
}