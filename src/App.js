import React, { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import { baseUrl, fetchApi } from "./fetchApi";
import Property from "./components/Property/Property";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
function App({
  propertiesForSale: propsForSale,
  propertiesForRent: propsForRent,
}) {
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // console.log(propertiesForSale);
  // console.log(propertiesForRent);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyForSaleResponse = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
        );
        const propertyForRentResponse = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
        );

        setPropertiesForSale(propertyForSaleResponse?.hits);
        setPropertiesForRent(propertyForRentResponse?.hits);
        setLoading(false); // Set loading to false after properties are loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [propertiesForRent, propertiesForSale]);
  return (
    <div>
      <Navbar />
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1=" Explore from Apartments, Homes, Villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose-for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      {loading ? (
        <h1 className="propertyHeader">LOADING...</h1> // Display "Loading..." while properties are loading
      ) : (
        <div className="property">
          {propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </div>
      )}

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy and Own Your"
        title2="Dream HOme"
        desc1=" Explore from Apartments, Homes, Villas"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose-for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      {loading ? (
        <h1 className="propertyHeader">LOADING...</h1>
      ) : (
        <div className="property">
          {propertiesForSale.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
