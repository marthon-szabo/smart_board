using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLChatGroupRepo : SQLRepositoryBase<ChatGroup>, IChatGroupRepo
    {
        public SQLChatGroupRepo(AppDbContext context)
            : base(context)
        {
            
        }
    }
}