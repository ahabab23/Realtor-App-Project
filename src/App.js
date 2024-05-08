import React, { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import { baseUrl, fetchApi } from "./fetchApi";
import Property from "./components/Property/Property";

function App({
  propertiesForSale: propsForSale,
  propertiesForRent: propsForRent,
}) {
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [propertiesForRent, setPropertiesForRent] = useState([]);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
      <div className="property">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
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
      <div className="property">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
