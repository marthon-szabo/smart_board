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
            picturePath: "/images/quests/timer.png",
            description: "Finish 5 tasks in a week to earn this badge!"
        },
        {
            picturePath: "/images/quests/chest.png",
            description: "Make 3 new friends this week to earn this badge!"
        },
        {
            picturePath: "/images/quests/exclamation.png",
            description: "Create a new board with a friend to earn this badge!"
        },
        {
            picturePath: "/images/quests/pen.png",
            description: "Create 10 tasks in a week to earn this badge!"
        },
        {
            picturePath: "/images/quests/sandclock.png",
            description: "Finish 10 tasks in a week to earn this badge!"
        },
        {
            picturePath: "/images/quests/star.png",
            description: "Make a new friend this week to earn this badge!"
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

    return (

        <div style={{ width: "auto", marginLeft: "35px", marginRight: "35px" }}>
            <p style={centerStyle}>Available quests</p>
            <Slider {...settings}>
                {availableQuestList.map((quest) => showElements(quest))}
            </Slider>

        </div>
    );
}

export default AvailableQuests;