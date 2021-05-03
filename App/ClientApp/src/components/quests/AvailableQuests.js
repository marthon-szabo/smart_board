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
        )}

function AvailableQuests () {
    const availableQuestList = [{
        picturePath: "/images/quests/timer.png" 
        },
        {
            picturePath: "/images/quests/chest.png"
        },
        {
            picturePath: "/images/quests/exclamation.png"
        },
        {
            picturePath: "/images/quests/pen.png"
        },
        {
            picturePath: "/images/quests/sandclock.png"
        },
        {
            picturePath: "/images/quests/star.png"
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

            <div style={{ width: "auto", marginLeft:"35px", marginRight: "35px" }}>
                <p style={ centerStyle }>Available quests</p>
                <Slider {...settings}>
                    {availableQuestList.map((quest) => showElements(quest))}
                </Slider>
                
            </div>
        );
    
}

export default AvailableQuests;