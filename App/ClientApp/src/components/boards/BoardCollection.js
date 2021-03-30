import React from 'react';
import CreateBoard from "./CreateBoard";
import Boards from "./Boards";

import "./BoardCollection.css";



function BoardCollection() {
    return (
        <div>
            <div className="boards-header">
                <h1> My boards </h1>
            </div>
            <div style={{ display: "flex" }}>
            <CreateBoard />
                <Boards />
                </div>
        </div>
        )
}

export default BoardCollection;
