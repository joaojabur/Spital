import React from "react";
import "./styles.css";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <div className="search-input">
      <IoSearchOutline
        style={{ padding: "0.2rem", marginLeft: "1rem" }}
        size={30}
        color="#093D48"
      />
      <input type="text" name="search" placeholder={placeholder} />
    </div>
  );
};

export default SearchInput;
