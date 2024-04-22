// This file is used to decide when to show the Popups div
import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

// Button for link
const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box">
      <p className="font-medium sm:text-xl text-center">{text}</p>
      <Link to={link} className="neo-brutalism-white neo-btn">
        {btnText}
        <img src={arrow} className="w-4 h-4 object-contain" />
      </Link>
    </div>
  );
};

// The information in the Popups div
const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      My name is <span className="font-semibold underline">ShowGa</span>
      <br />
      <span>A Software Engineering Learner</span>
    </h1>
  ),
  2: (
    <InfoBox
      text="Learning software engineering by watching online courses and building apps ."
      link="/about"
      btnText="Learn More"
    />
  ),
  3: (
    <InfoBox
      text="I've done few projects, see more details in the following link to Projects page"
      link="/projects"
      btnText="See what I've done"
    />
  ),
  4: (
    <InfoBox
      text="Contact page in following link ! Feel free to say hi to me ."
      link="/contact"
      btnText="Contact Me"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
