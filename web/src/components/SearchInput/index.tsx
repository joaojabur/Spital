import React from "react";
import "./styles.css";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, ...rest }) => {
  return (
    <div className="search-input">
      <IoSearchOutline
        style={{ padding: "0.2rem", marginLeft: "1rem" }}
        size={30}
        color="#093D48"/>
      <input type="text" name="search" placeholder={placeholder} {...rest}/>
    </div>
  );
};

export default SearchInput;
