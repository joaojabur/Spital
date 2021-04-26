import React from "react";
import "./styles.css";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="search-input">
      <IoSearchOutline style={{ padding: "0.2rem", marginLeft: '1rem' }} size={30} color="#093D48" />
      <input
        type="text"
        name="search"
        placeholder="Busque pelo nome do médico..."
      />
    </div>
  );
};

export default SearchInput;
