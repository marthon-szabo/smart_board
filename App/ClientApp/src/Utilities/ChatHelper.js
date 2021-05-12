import { HubConnectionBuilder } from '@microsoft/signalr';

class ChatHelper {
    
    static connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

    createChatGroup(boards) {
        const lastBoard = boards[boards.length - 1];
        
        fetch(`https://localhost:5001/boards/chat-group/${lastBoard.boardId}`)
            .then(resp => resp.json())
            .then(data => this.registerChatGroup(data))
    }
    
    registerChatGroup(chatGroup) {
        console.log(chatGroup.id)
        ChatHelper.connection.invoke("JoinGroup", chatGroup.id)
    }
}

export default ChatHelper;