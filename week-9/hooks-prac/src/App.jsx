import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  useEffect(() => {
    axios.get("some URL for fetching the data with the debouncedValue from BE");
  }, []);

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
