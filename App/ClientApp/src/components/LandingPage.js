import React from 'react';
import LandingHeader from "./LandingHeader";
import CreateBoardModal from "./boards/CreateBoardModal";

import './NavMenu.css';

function LandingPage() {
    return (
        <div>
        <div className="container">
            <LandingHeader/>
            </div>
            <CreateBoardModal/>
        </div>
        )
}
export default LandingPage;