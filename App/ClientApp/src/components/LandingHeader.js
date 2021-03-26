import React from 'react';

import "./LandingHeader.css"

function LandingHeader() {
    return (
        <div className="main-header">
            <div className="welcome-sign">
                <h3>Welcome</h3>
            </div>
            <div className="date-container">
                <p className="date">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
        )
}

export default LandingHeader;