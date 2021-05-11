using App.Models.Entities;

namespace App.Services.Factories.Interfaces
{
    public interface IChatGroupFactory
    {
        ChatGroup Create(string boardId, string userId);
    }
}