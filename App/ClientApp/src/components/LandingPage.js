import React from 'react';
import LandingHeader from "./LandingHeader";
import CreateBoardModal from "./boards/CreateBoardModal";
import CreateColumnModal from "./columns/CreateColumnModal";
import CreateTaskModal from "./tasks/CreateTaskModal";
import BoardDetails from "./boards/BoardDetails";
import DeleteConfirmationModal from './boards/DeleteConfirmationModal';
import DeleteColumnConfirmationModal from "./columns/DeleteColumnConfirmationModal";
import DeleteTaskConfirmationModal from "./tasks/DeleteTaskConfirmationModal";

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