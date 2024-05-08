import React from "react";
import "./index.css";

function Banner({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) {
  return (
    <div className="banner-container">
      <img src={imageUrl} alt="Banner" className="banner-image" />
      <div className="banner-content">
        <p className="banner-purpose">{purpose}</p>
        <h1 className="banner-title">
          {title1}
          <br />
          {title2}
        </h1>
        <p className="banner-description">
          {desc1}
          <br />
          {desc2}
        </p>
        <a href={linkName} className="banner-button">
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default Banner;
