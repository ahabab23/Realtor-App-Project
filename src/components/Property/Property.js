import { Link } from "react-router-dom";
import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../../Images/home.jpg";
import "./index.css"; // Import your vanilla CSS file

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link to={`/property/${externalID}`} className="property-link">
    <div className="property-container">
      <div className="property-image">
        <img
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          alt="Property"
          width={400}
          height={260}
        />
      </div>
      <div className="property-details">
        <div className="property-header">
          {isVerified && <GoVerified className="verified-icon" />}
          <span className="property-price">
            AED {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </span>
          <img
            src={agency?.logo?.url}
            alt="Agency Logo"
            className="agency-logo"
          />
        </div>
        <div className="property-meta">
          <span className="property-room">
            {rooms} BR <FaBed />
          </span>
          <span className="property-bath">
            {baths} BATH
            <FaBath />
          </span>
          <span className="property-area">
            {millify(area)} sqft <BsGridFill />
          </span>
        </div>
        <div className="property-title">
          {title.length > 50 ? `${title.substring(0, 30)}...` : title}
        </div>
      </div>
    </div>
  </Link>
);

export default Property;
