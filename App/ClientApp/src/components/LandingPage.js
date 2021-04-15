import React from 'react';
import LandingHeader from "./LandingHeader";
import CreateBoardModal from "./boards/CreateBoardModal";
import CreateColumnModal from "./boards/CreateColumnModal";
import CreateTaskModal from "./boards/CreateTaskModal";
import BoardDetails from "./boards/BoardDetails";
import DeleteConfirmationModal from './boards/DeleteConfirmationModal';
import DeleteColumnConfirmationModal from "./boards/DeleteColumnConfirmationModal";
import DeleteTaskConfirmationModal from "./boards/DeleteTaskConfirmationModal";

import './NavMenu.css';


function LandingPage() {
    return (
        <div>
        <div className="container">
            <LandingHeader />
        </div>
            <CreateBoardModal />
            <DeleteConfirmationModal/>
            <BoardDetails />
            <DeleteColumnConfirmationModal />
            <DeleteTaskConfirmationModal />
            <CreateColumnModal />
            <CreateTaskModal />
        </div>
        )
}
export default LandingPage;