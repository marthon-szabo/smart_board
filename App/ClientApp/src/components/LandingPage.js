import React from 'react';
import LandingHeader from "./LandingHeader";
import CreateBoardModal from "./boards/CreateBoardModal";
import CreateColumnModal from "./columns/CreateColumnModal";
import CreateTaskModal from "./tasks/CreateTaskModal";
import BoardDetails from "./boards/BoardDetails";
import DeleteConfirmationModal from './boards/DeleteConfirmationModal';
import DeleteColumnConfirmationModal from "./columns/DeleteColumnConfirmationModal";
import DeleteTaskConfirmationModal from "./tasks/DeleteTaskConfirmationModal";
import TaskDetailsModal from "./tasks/TaskDetailsModal";
import AvailableDetailModal from "./quests/AvailableDetailModal";
import ShareBoardModal from "./userManagement/boardSharing/ShareBoardModal";

import './NavMenu.scss';

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
            <TaskDetailsModal />
            <AvailableDetailModal />
            <ShareBoardModal />
        </div>
    )
}
export default LandingPage;