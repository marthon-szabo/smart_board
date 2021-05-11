using App.Models.Entities;
using App.Services.Factories.Interfaces;
using App.Utilities;

namespace App.Services.Factories
{
    public class ChatGroupFactory : IChatGroupFactory
    {
        public ChatGroup Create(string boardId, string userId)
        {
            return new ChatGroup
            {
                Id = IdGenerator.GenerateId(),
                UserId = userId,
                BoardId = boardId
            };
        }
    }
}