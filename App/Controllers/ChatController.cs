using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using App.Models.Entities;
using App.Models.ViewModels;
using App.Services.Factories.Interfaces;
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
        private readonly IChatMessageRepo _chatMessageRepo;
        private readonly IChatGroupRepo _chatGroupRepo;
        private readonly IUsersBoardsRepository _usersBoardsRepo;
        private readonly IChatMessageVMFactory _chatMessageVMFactory;
        private readonly IUserRepository _usersRepo;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, IChatMessageRepo chatMessageRepo,
            IChatGroupRepo chatGroupRepo, IUsersBoardsRepository usersBoardsRepo, IChatMessageVMFactory chatMessageVMFactory,
            IUserRepository usersRepo)
        {
            _chatHub = chatHub;
            _chatMessageRepo = chatMessageRepo;
            _chatGroupRepo = chatGroupRepo;
            _usersBoardsRepo = usersBoardsRepo;
            _chatMessageVMFactory = chatMessageVMFactory;
            _usersRepo = usersRepo;
        }

        [HttpGet("boards/chat/{boardId}/{userId}")]
        public IEnumerable<ChatMessageVM> GetAllMessages(string boardId, string userId)
        {
            if(this.EvaluateUser(boardId, userId))
            {
                
                IEnumerable<ChatMessage> chatMessages = _chatMessageRepo.GetAllEntities()
                    .Select(message => message)
                    .Where(message => message.BoardId.Equals(boardId))
                    .ToArray();

                foreach(ChatMessage chatMessage in chatMessages)
                {
                    yield return _chatMessageVMFactory.CreateByChatMessage(chatMessage);
                }
            }
        }

        [HttpPost("boards/chat")]
        public async System.Threading.Tasks.Task PostMessage()
        {
            ChatMessage chatMessage = this.ReadRequestBody<ChatMessage>(Request.Body);
            User user = _usersRepo.GetEntityById(chatMessage.SenderId);
            
            chatMessage.Id = IdGenerator.GenerateId();
            chatMessage.SenderName = user.UserName;
            chatMessage.ProfilePicture = user.ProfilePicture;

            _chatMessageRepo.CreateEntity(chatMessage);

            await _chatHub.Clients.All.ReceiveMessage(chatMessage);
        }

        [HttpGet("boards/chat/chat-group/{boardId}")]
        public ChatGroup GetChatGroup(string boardId)
        {
            ChatGroup chatGroup = _chatGroupRepo.GetAllEntities()
                .Select(chatGroup => chatGroup)
                .Where(chatGroup => chatGroup.BoardId.Equals(boardId))
                .ToArray()[0];
            
            return chatGroup;
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