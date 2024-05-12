import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import filterModule from "../../FilterData";
const { filterData, getFilterValues } = filterModule;
const SearchFilters = () => {
  const [filters] = useState(filterData);
  const navigate = useNavigate();
  const location = useLocation();

  const searchProperties = (filterValues) => {
    const path = location.pathname;
    const search = location.search ?? "";
    const query = new URLSearchParams(search);

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query.set(item.name, item.value);
      }
    });

    navigate({ pathname: path, search: query.toString() });
  };

  return (
    <div className="search-filters-container">
      {filters.map((filter) => (
        <div key={filter.queryName} className="search-filter">
          <select
            placeholder={filter.placeholder}
            className="search-filter-select"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SearchFilters;
