import React from 'react';

const Message = (props) =>{

    console.log(`props: `, props)

    return (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
        <p><img className="chat-client__profile-picture" src={props.profilePicture} /></p>{props.name}:
        <p>{props.message}</p>
    </div>
    );
}
export default Message;