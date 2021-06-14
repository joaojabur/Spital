import React from "react";
import "./styles.css";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  reload?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  reload,
  ...rest
}) => {
  return (
    <div className="search-input">
      <IoSearchOutline
        style={{ padding: "0.2rem", marginLeft: "1rem" }}
        size={30}
        color="#093D48"
      />
      <input type="text" name="search" placeholder={placeholder} {...rest} />
      {placeholder === "Busque pelo nome do médico..." && (
        <button onClick={reload}>Buscar</button>
      )}
    </div>
  );
};

export default SearchInput;
