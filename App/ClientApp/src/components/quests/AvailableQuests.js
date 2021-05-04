import React from "react";
import Slider from "react-slick";
import AvailableQuest from "./AvailableQuest";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../static/scss/Flippable-card.scss";

function showElements(quest) {
    return (
        <div>
            <AvailableQuest quest={quest} />
        </div>
    )
}

function AvailableQuests() {
    const availableQuestList = [
        {
            id: 1,
            questName: "In time finisher",
            picturePath: "/images/quests/timer.png",
            description: "Finish 5 tasks in a week to earn this badge!",
            toFinish: "7 days"
        },
        {
            id: 2,
            questName: "Friend collector",
            picturePath: "/images/quests/chest.png",
            description: "Make 3 new friends this week to earn this badge!",
            toFinish: "7 days"
        },
        {
            id: 3,
            questName: "Important teamworker",
            picturePath: "/images/quests/exclamation.png",
            description: "Create a new board with a friend to earn this badge!",
            toFinish: "7 days"
        },
        {
            id: 4,
            questName: "Creative creator",
            picturePath: "/images/quests/pen.png",
            description: "Create 10 tasks in a week to earn this badge!",
            toFinish: "7 days"
        },
        {
            id: 5,
            questName: "Task master",
            picturePath: "/images/quests/sandclock.png",
            description: "Finish 10 tasks in a week to earn this badge!",
            toFinish: "7 days"
        },
        {
            id: 6,
            questName: "Friend maker superstar",
            picturePath: "/images/quests/star.png",
            description: "Make a new friend this week to earn this badge!",
            toFinish: "7 days"
        }]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const centerStyle = {
        diplay: "block",
        left: "auto",
        right: "auto"
    };

    return(
        <div style={{ width: "auto", marginLeft: "35px", marginRight: "35px" }}>
            <p style={centerStyle}>Available quests</p>
            <Slider {...settings}>
                {availableQuestList.map((quest) => showElements(quest))}
            </Slider>
        </div>);
}

export default AvailableQuests;