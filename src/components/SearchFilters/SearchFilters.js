import React, { useState, useEffect } from "react";
import { fetchApi, baseUrl } from "../../fetchApi";
import { filterData, getFilterValues } from "../../FilterData";
import { MdCancel } from "react-icons/md";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchProperties = (filterValues) => {
    const values = getFilterValues(filterValues);
    // update the query parameter with the selected filter values
  };

  const handleFilterChange = (filterName, value) => {
    searchProperties({ [filterName]: value });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowLocations = () => {
    setShowLocations(!showLocations);
  };

  const fetchData = async () => {
    if (searchTerm !== "") {
      setLoading(true);
      const response = await fetchApi(`${baseUrl}/auto-complete`, {
        params: {
          query: searchTerm,
        },
      });
      const data = await response.json();
      setLocationData(data.hits);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div className="search-filters">
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <select
            className="filter-select"
            onChange={(e) =>
              handleFilterChange(filter.queryName, e.target.value)
            }
          >
            <option value="">{filter.placeholder}</option>
            {filter.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="location-search">
        <button className="location-button" onClick={handleShowLocations}>
          Search Location
        </button>

        {showLocations && (
          <div className="location-input-container">
            <input
              className="location-input"
              value={searchTerm}
              placeholder="Type Here"
              onChange={handleSearchTermChange}
            />

            {searchTerm !== "" && (
              <span className="cancel-icon" onClick={() => setSearchTerm("")}>
                <MdCancel />
              </span>
            )}

            {loading && <div className="spinner">Loading...</div>}

            {locationData.length > 0 && (
              <div className="location-results">
                {locationData.map((location) => (
                  <div
                    className="location-result"
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <div className="location-name">{location.name}</div>
                  </div>
                ))}
              </div>
            )}

            {!loading && locationData.length === 0 && (
              <div className="no-results">
                <img src="noresult.svg" alt="no result" />
                <div className="no-results-text">Waiting to search!</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
