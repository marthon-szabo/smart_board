import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatIcon from '../../images/chat_bubble.png';
import ChatHelper from '../../Utilities/ChatHelper';

const ChatClient = (props) => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const latestChat = useRef(null);
    const chatWindow = useRef();
    const chatHelper = new ChatHelper();

    const chatMessage = {
        id: "sent",
        boardId: props.boardId,
        senderId: props.userId,
        content: "message",
        date: "getCurrentTime()"
    };


    latestChat.current = chat;

    
    useEffect(() => {
        const newConnection = ChatHelper.connection;

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const getMessages = () => {
        setIsOpen(!isOpen);

        fetch(`https://localhost:5001/boards/chat/${props.boardId}/${props.userId}`)
            .then(data => data.json())
            .then(res => console.log(res));
        
    }

    const getCurrentTime = () => {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        
        const time = 
            `${currentDate.getFullYear()}-${formatTime(month)}-` +
            `${currentDate.getDate()}T${currentDate.getHours()}:` +
            `${formatTime(minutes)}:${formatTime(seconds)}Z`;

        return time;
    }

    const formatTime = (time) => {
        const formattedTime = (time.toString().length == 1) ? `0${time}` : time;

        return formattedTime;
    }

    const sendMessage = async (message) => {
        chatMessage.content = message;
        chatMessage.date = getCurrentTime();
        
        if (connection.connectionStarted) {
            try {
                await  fetch('https://localhost:5001/boards/chat', { 
                    method: 'POST', 
                    body: JSON.stringify(chatMessage),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch(e) {
                console.log('Sending message failed.', e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <div>
            <img src={ChatIcon} onClick={getMessages}/>
            <hr />
            
            <ChatWindow chat={chat} sendMessage={sendMessage} isHidden={isOpen} />
            
        </div>
    );
};

export default ChatClient;
