import React from "react";
import "./index.css";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import DefaultImage from "../../Images/home.jpg";

function Property({
  property: {
    coverPhoto,
    price,
    rentalFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalId,
  },
}) {
  return (
    <div className="property">
      <div>
        <img
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          alt="homes"
          width={400}
          height={260}
        />
      </div>
      <div>
        <div>
          <div>
            <div>{isVerified && <GoVerified />}</div>
            <h1>
              AED {millify(price)}
              {rentalFrequency && `/$ rentalFrequency`}
            </h1>
          </div>
          <div>
            {" "}
            <img src={agency?.logo?.url} alt="avatar" />
          </div>
        </div>
        <div>
          {rooms} <FaBed />|{baths}
          <FaBath />|{millify(area)} sqft <BsGridFill />
          <h1>{title.length > 30 ? `${title.substring(0, 30)}...` : title}</h1>
        </div>
      </div>
    </div>
  );
}
export default Property;
