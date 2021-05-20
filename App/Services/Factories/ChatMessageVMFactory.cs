using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Factories.Interfaces;
using App.Services.Repositories.Interfaces;

namespace App.Services.Factories
{
    public class ChatMessageVMFactory : IChatMessageVMFactory
    {
        private readonly IUserRepository _userRepo;

        public ChatMessageVMFactory(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public ChatMessageVM CreateByChatMessage(ChatMessage chatMessage)
        {
            string userId = chatMessage.SenderId;
            string userName = _userRepo.GetEntityById(chatMessage.SenderId).UserName;

            ChatMessageVM newChatMessageVM = new ChatMessageVM
            {
                MessageId = chatMessage.Id,
                SenderId = userId,
                SenderName = userName,
                Content = chatMessage.Content,
                Date = chatMessage.Date,
                ProfilePicture = this.GetProfilePicture(userId)
            };

            return newChatMessageVM;
        }

        private string GetProfilePicture(string userId)
        {
            User user = _userRepo.GetEntityById(userId);

            return user.ProfilePicture;
        }
    }
}