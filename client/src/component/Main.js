import React from "react";
import Navigation from "./Sidebar";
import TwitteSection from "./TwitteSection";
import Follow from "./Follow";

const Main = () => {
  return (
    <div className="   main ">
      <div className="side_section">
        <i
          className="fa fa-twitter fa-3x"
          aria-hidden="true"
          style={{ marginBottom: "10%", marginLeft: "25px", color: "blue" }}
        ></i>
        <Navigation />
      </div>

      <div className="main_section">
        <TwitteSection />
      </div>
      <div className="follow_section">
        <Follow />
      </div>
    </div>
  );
};

export default Main;
