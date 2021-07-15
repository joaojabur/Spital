import React from "react";
import "./styles.css";

const Video = () => {
  return (
    <div className="video">
      <h1>Assita e este vídeo para entender melhor como nossa plataforma te ajudará!</h1>
      <iframe
        src="https://www.youtube.com/embed/EAh-TJk3QBM"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
