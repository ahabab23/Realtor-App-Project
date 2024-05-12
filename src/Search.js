import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Property from "./components/Property/Property";
import SearchFilters from "./components/SearchFilters/SearchFilters";
import noresult from "./Images/noresult.svg";
import { fetchApi, baseUrl } from "./fetchApi";
import { BsFilter } from "react-icons/bs";
import Navbar from "./components/Navbar/Navbar";

const Search = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const purpose =
        new URLSearchParams(location.search).get("purpose") || "for-rent";
      const rentFrequency =
        new URLSearchParams(location.search).get("rentFrequency") || "yearly";
      const minPrice =
        new URLSearchParams(location.search).get("minPrice") || "0";
      const maxPrice =
        new URLSearchParams(location.search).get("maxPrice") || "1000000";
      const roomsMin =
        new URLSearchParams(location.search).get("roomsMin") || "0";
      const bathsMin =
        new URLSearchParams(location.search).get("bathsMin") || "0";
      const sort =
        new URLSearchParams(location.search).get("sort") || "price-desc";
      const areaMax =
        new URLSearchParams(location.search).get("areaMax") || "35000";
      const locationExternalIDs =
        new URLSearchParams(location.search).get("locationExternalIDs") ||
        "5002";
      const categoryExternalID =
        new URLSearchParams(location.search).get("categoryExternalID") || "4";

      const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
      );

      setProperties(data?.hits);
    };

    fetchData();
  }, [location]);

  const handleSearchFiltersClick = () => {
    setSearchFilters((prevFilters) => !prevFilters);
  };

  return (
    <div className="search-container">
      <Navbar />
      <div className="search-header" onClick={handleSearchFiltersClick}>
        <div className="search-title">Search Property By Filters</div>
        <div className="search-icon">
          <BsFilter />
        </div>
      </div>
      {searchFilters && <SearchFilters />}
      <div className="search-results-title">
        Properties {new URLSearchParams(location.search).get("purpose")}
      </div>
      <div className="search-results">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="search-no-results">
          <img alt="no result" src={noresult} />
          <div className="search-no-results-text">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Search;
