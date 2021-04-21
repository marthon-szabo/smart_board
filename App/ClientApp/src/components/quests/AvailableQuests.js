import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../static/scss/Flippable-card.scss";

export default class AvailableQuests extends Component {
    render() {

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
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="artboard">
                            <div class="flippable-card">

                                <div class="flippable-card__side flippable-card__side--back">
                                    <div class="flippable-card__cover">
                                        <h4 class="flippable-card__heading">
                                            <span class="flippable-card__heading-span">Skill Set</span>
                                        </h4>
                                    </div>
                                    <div class="flippable-card__details">
                                        <ul>
                                            <li>Advanced JS and CSS</li>
                                            <li>JS/CSS Preprocessors</li>
                                            <li>JS Frameworks</li>
                                            <li>Advanced Animations</li>
                                            <li>Deployment Pipelines</li>
                                            <li>Large Apps Architectures</li>
                                            <li>Naming Conventions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="flippable-card__side flippable-card__side--front">
                                    <div class="flippable-card__theme">
                                        <div class="flippable-card__theme-box">
                                            <p class="flippable-card__subject">Web Developer</p>
                                            <p class="flippable-card__title">Hello World!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Slider>
                
            </div>
        );
    }
}