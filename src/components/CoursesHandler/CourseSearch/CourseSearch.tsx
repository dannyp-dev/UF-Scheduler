import React from "react";
import axios from "axios";
import "./styles.css";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "react-oidc-context";

import { BACKEND_URLS, getAuthHeaders } from "../../../config/api";

interface CourseSearchProps {
  availableTerms: { term: string; year: string; courses: number; sectionsWithMeetingTimes: number }[];
  setDebouncedSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: boolean;
  setSearchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string;
  handleTermChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CourseSearch: React.FC<CourseSearchProps> = ({
  availableTerms,
  setDebouncedSearchTerm,
  searchTerm,
  setSearchTerm,
  searchTrigger,
  setSearchTrigger,
  selectedValue,
  handleTermChange,
}) => {
  const auth = useAuth();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value;
      setDebouncedSearchTerm(value);
      setSearchTrigger(!searchTrigger);
      if (value !== "" && value.length === 7) {
        handleSearchMetrics(value);
      }
    }
  };

  const handleSearchMetrics = async (formattedInput: string) => {
    try {
      await axios.post(
        BACKEND_URLS.SEARCH_METRICS,
        { search_term: formattedInput },
        { headers: getAuthHeaders(auth) }
      );
    } catch (error) {
      // Metrics send failed silently
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="search-container flex-grow">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search courses"
          id="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyPress}
          autoCorrect="off"
          className="search-input"
          style={{ zIndex: 998 }}
        />
      <select
        value={selectedValue}
        onChange={handleTermChange}
        className="term-year-dropdown bg-[#f0f0f0] text-base text-[#6d727e] font-sans font-semibold"
      >
        {availableTerms.map(({ term, year }) => (
          <option key={`${term}_${year}`} value={`${term} ${year}`}>
            {term.charAt(0).toUpperCase() + term.slice(1)} {year}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default CourseSearch;
