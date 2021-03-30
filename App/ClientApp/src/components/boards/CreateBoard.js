﻿import React from 'react';

import PlusIcon from '../../images/plus.png';
import './BoardCard.scss';

const IconStyle = {
    width: "80px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "15px"
}

function CreateBoard() {
    return (
        <div class="card-container center">
            <div class="card">
                <img src={PlusIcon} alt="Plus icon" style={ IconStyle }></img>
                <hr />
                <p>Click the button to create a new board!</p>
                <button>Create</button>
            </div>
        </div>
        )
}

export default CreateBoard;