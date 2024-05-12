import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl, fetchApi } from "../fetchApi";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import ImageScrollbar from "../components/Scrollbar/Scrollbar";
import millify from "millify";
import "./index.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const PropertyDetails = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        `${baseUrl}/properties/detail?externalID=${id}`
      );
      setPropertyDetails(data);
    };

    fetchData();
  }, [id]);

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = propertyDetails;

  return (
    <>
      <Navbar />
      <div className="property-details-container">
        <div className="property-details-image-container">
          {photos && <ImageScrollbar photos={photos} />}
        </div>

        <div className="property-details-info-container">
          <div className="property-details-short-info">
            <div className="property-details-verified">
              {isVerified && <GoVerified />}
            </div>
            <div className="property-details-price">
              AED {price.toLocaleString()}
              {rentFrequency && `/${rentFrequency}`}
            </div>
            <div className="property-details-agency">
              <img src={agency?.logo?.url} alt="agency logo" />
            </div>
          </div>

          <div className="property-details-features">
            {rooms} <FaBed /> | &nbsp;
            {baths} <FaBath /> | &nbsp;
            {millify(area)} sqft <BsGridFill />
          </div>

          <div className="property-details-title">
            <div className="property-details-title-text">
              {title.split("/").join(" / ")}
            </div>
          </div>

          <div className="property-details-description">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div className="property-details-filters">
            <div className="property-details-filter">
              <div className="property-details-filter-name">Type</div>
              <div className="property-details-filter-value">{type}</div>
            </div>

            <div className="property-details-filter">
              <div className="property-details-filter-name">Purpose</div>
              <div className="property-details-filter-value">{purpose}</div>
            </div>

            {furnishingStatus && (
              <div className="property-details-filter">
                <div className="property-details-filter-name">
                  Furnishing Status
                </div>
                <div className="property-details-filter-value">
                  {furnishingStatus}
                </div>
              </div>
            )}
          </div>

          <div className="property-details-amenities">
            {amenities?.length && (
              <div className="property-details-amenities-title">
                Facilities:
              </div>
            )}

            <div className="property-details-amenities-list">
              {amenities?.map((item) =>
                item?.amenities?.map((amenity) => (
                  <div className="property-details-amenity" key={amenity.text}>
                    {amenity.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;
