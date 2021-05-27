import React from 'react';

const Message = (props) =>{

    console.log(`props: `, props)

    return (
    <div className="chat-client__message" style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
        <p><img className="chat-client__profile-picture" src={props.profilePicture} />{props.name}:</p>
        <p>{props.message}</p>
    </div>
    );
}
export default Message;