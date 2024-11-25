import React from "react";

const Slide = ({ data }) => {
  const { title, text, background, textColor } = data;

  return (
    <div
      className="slide-inner slide-bg-image"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container">
        <div data-swiper-parallax="300" className={`slide-title ${textColor}`}>
          <h2>{title}</h2>
        </div>
        <div data-swiper-parallax="400" className={`slide-text ${textColor}`}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
