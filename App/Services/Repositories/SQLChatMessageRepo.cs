using System.Collections.Generic;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLChatMessageRepo : SQLRepositoryBase<ChatMessage>,IChatMessageRepo
    {
        public SQLChatMessageRepo(AppDbContext context)
            : base(context)
        {
            
        }
    }
}