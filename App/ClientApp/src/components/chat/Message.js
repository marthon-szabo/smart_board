import React from 'react';

const Message = (props) =>{

    return (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
        <p><img className="chat-client__profile-picture"src={props.profilePicture} /></p>
        <p>{props.message}</p>
    </div>
    );
}
export default Message;