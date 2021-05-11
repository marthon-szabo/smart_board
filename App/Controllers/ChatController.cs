using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using App.Models.Entities;
using App.Services.Hubs;
using App.Services.Hubs.Interfaces;
using App.Services.Repositories.Interfaces;
using App.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace App.Controllers
{
    public class ChatController : Controller
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private readonly IChatService _chatService;
        private readonly IChatMessageRepo _chatMessageRepo;
        private readonly IChatGroupRepo _chatGroupRepo;
        private readonly IUsersBoardsRepository _usersBoardsRepo;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, IChatMessageRepo chatMessageRepo,
            IChatGroupRepo chatGroupRepo, IUsersBoardsRepository usersBoardsRepo, IChatService chatService)
        {
            _chatHub = chatHub;
            _chatMessageRepo = chatMessageRepo;
            _chatGroupRepo = chatGroupRepo;
            _usersBoardsRepo = usersBoardsRepo;
            _chatService = chatService;
        }

        [HttpGet("boards/chat/{boardId}/{userId}")]
        public IEnumerable<ChatMessage> GetAllMessages(string boardId, string userId)
        {
            if(this.EvaluateUser(boardId, userId))
            {
                
                IEnumerable<ChatMessage> chatMessages = _chatMessageRepo.GetAllEntities()
                    .Select(message => message)
                    .Where(message => message.BoardId.Equals(boardId))
                    .ToArray();

                return chatMessages;
            }

            return new ChatMessage[0];
        }

        [HttpPost("boards/chat")]
        public async System.Threading.Tasks.Task PostMessage()
        {
            ChatMessage chatMessage = this.ReadRequestBody<ChatMessage>(Request.Body);
            chatMessage.Id = IdGenerator.GenerateId();
            _chatMessageRepo.CreateEntity(chatMessage);

            await _chatHub.Clients.All.ReceiveMessage(chatMessage);
        }

        private T ReadRequestBody<T>(Stream stream)
        {
            StreamReader sr = new StreamReader(stream);
            string requestJson = sr.ReadToEndAsync().Result;

            T requestVM = JsonConvert.DeserializeObject<T>(requestJson);

            return requestVM;
        }

        private bool EvaluateUser(string boardId, string userId)
        {
            try 
            {
                IEnumerable<UsersBoards> usersBoardsConnections = _usersBoardsRepo.GetUsersBoardsByUserId(userId);
                
                foreach(UsersBoards usersBoardConnection in usersBoardsConnections)
                {
                    if (usersBoardConnection.BoardId.Equals(boardId))
                    {
                        return true;
                    }

                }

                return false;
            }
            catch(ArgumentNullException nullValue)
            {
                return false;
            }
            
            return false;
        }

    }
}