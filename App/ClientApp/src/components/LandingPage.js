import React from 'react';
import LandingHeader from "./LandingHeader";
import CreateBoardModal from "./boards/CreateBoardModal";
import BoardDetails from "./boards/BoardDetails";

import './NavMenu.css';
import DeleteConfirmationModal from './boards/DeleteConfirmationModal';

function LandingPage() {
    return (
        <div>
        <div className="container">
            <LandingHeader/>
            </div>
            <CreateBoardModal />
            <DeleteConfirmationModal/>
            <BoardDetails/>
        </div>
        )
}
export default LandingPage;