import React from 'react';

import Message from './Message';
import ChatInput from './ChatInput';

const ChatWindow = (props) => {

    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            profilePicture={m.profilePicture}
            name={m.senderName}
            message={m.content}/>);

    return(
        <div hidden={props.isHidden}>
            {chat}
            <ChatInput sendMessage={props.sendMessage} />
        </div>
    )
};

export default ChatWindow;