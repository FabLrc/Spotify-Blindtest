import React from "react";
import videoBg from "../Medias/background.mp4";
import "./Background.css";

function Background(props) {
  return (
    <div>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="videoBackground"
      ></video>
    </div>
  );
}

export default Background;
