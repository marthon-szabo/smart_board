import React from 'react';
import CreateBoard from "./CreateBoard";

import "./BoardCollection.css";

function BoardCollection() {
    return (
        <div>
            <div className="boards-header">
                <h1> My boards </h1>
            </div>
            <CreateBoard />
        </div>
        )
}

export default BoardCollection;
